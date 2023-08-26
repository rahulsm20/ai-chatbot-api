import express from 'express'
import { Signup, createChatbotForUser, deleteUserByID, findUserByID, getUser, updateUserByID } from '../controllers/users';
import { getAllChatbots, updateChatbotByID } from '../controllers/chatbot';
const router = express.Router();


router.post('/',Signup);
router.get('/',getUser)
router.get('/:id',findUserByID);
router.put('/:id',updateUserByID);
router.delete('/:id',deleteUserByID);
router.post("/:userId/chatbots",createChatbotForUser)
router.get("/:userId/chatbots",getAllChatbots)

export default router