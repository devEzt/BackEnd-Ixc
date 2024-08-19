import { Request, Response } from 'express'
import { Message } from '../models/Message'
import { getIO } from '../services/socket'

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
    await newMessage.save()

    const io = getIO()
    io.to(sender).to(receiver).emit('newMessage', newMessage)

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
