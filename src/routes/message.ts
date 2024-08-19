import express from 'express'
import {
  getMessages,
  createMessage,
  getMessagesBetweenUsers,
  getUserConversations,
} from '../controllers/messageController'

const router = express.Router()

router.get('/conversations/:userId', getUserConversations)
router.get('/:senderId/:receiverId', getMessagesBetweenUsers)
router.get('/', getMessages)
router.post('/', createMessage)

export default router
