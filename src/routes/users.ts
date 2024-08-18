import express from 'express'
import { listUsers, createUser, getUserById, deleteUserById } from '../controllers/userController'

const router = express.Router()

router.get('/', listUsers)
router.post('/', createUser)
router.get('/:id', getUserById)
router.delete('/:id', deleteUserById)

export default router
