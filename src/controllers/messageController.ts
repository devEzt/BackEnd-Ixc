import { Request, Response } from 'express'
import { Message } from '../models/Message'
import { getIO } from '../services/socket'

import { Document, Types } from 'mongoose'

interface IUser extends Document {
  _id: Types.ObjectId
  name: string
}

interface IMessage extends Document {
  _id: Types.ObjectId
  content: string
  sender: IUser
  receiver: IUser
  createdAt: Date
}

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({})
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error })
  }
}

export const createMessage = async (req: Request, res: Response) => {
  const { content, sender, receiver } = req.body
  try {
    const newMessage = new Message({ content, sender, receiver })
    const io = getIO()
    await newMessage.save()
    io.emit('newMessage', newMessage)

    io.to(sender).emit('newMessage', newMessage)
    io.to(receiver).emit('newMessage', newMessage)

    res.status(201).json({ message: 'Message created successfully', newMessage })
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error })
  }
}

export const getMessagesBetweenUsers = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.params
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ timestamp: 1 })
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error })
  }
}

export const getUserConversations = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate<{ sender: IUser; receiver: IUser }>('sender receiver', 'name _id')
      .sort({ createdAt: -1 })

    const conversations = new Map<string, any>()

    messages.forEach((msg: any) => {
      const otherUserId = msg.sender._id.toString() === userId ? msg.receiver._id.toString() : msg.sender._id.toString()
      if (!conversations.has(otherUserId)) {
        conversations.set(otherUserId, {
          lastMessage: msg.content,
          name: msg.sender._id.toString() === userId ? msg.receiver.name : msg.sender.name,
          userId: otherUserId,
        })
      }
    })

    res.json(Array.from(conversations.values()))
  } catch (error) {
    res.status(500).send({ message: 'Error fetching conversations', error })
  }
}
