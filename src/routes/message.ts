import express from 'express'
import { getMessages, createMessage, getMessagesBetweenUsers } from '../controllers/messageController'

const router = express.Router()

router.get('/', getMessages)
router.post('/', createMessage)

router.get('/:senderId/:receiverId', getMessagesBetweenUsers)
router.post('/', createMessage)

export default router
