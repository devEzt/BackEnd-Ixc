import { User } from '../models/User'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET as string

export const listUsers = async (req: any, res: any) => {
  console.log('Accessing listUsers')
  try {
    const users = await User.find({})
    console.log('Users found:', users)
    res.json(users)
  } catch (error) {
    console.log('Error in listUsers:', error)
    res.status(500).json({ message: 'Error fetching users', error })
  }
}

export const createUser = async (req: any, res: any) => {
  const { name, email, password } = req.body
  try {
    const newUser = new User({ name, email, password })
    await newUser.save()
    res.status(201).json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error })
  }
}

export const deleteUserById = async (req: any, res: any) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' })
    res.json({ token })
  } catch (error: any) {
    console.error('Login error:', error) // Log detalhado do erro
    res.status(500).json({ message: 'Server error', error: error.message || 'Unknown error' })
  }
}
