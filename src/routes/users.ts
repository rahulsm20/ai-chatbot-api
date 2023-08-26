import express from 'express'
import { Signup, createChatbotForUser, createUser, deleteUserByID, findUserByID, getUser, signin, updateUserByID } from '../controllers/users';
import { getAllChatbots, updateChatbotByID } from '../controllers/chatbot';
import authMiddleware from '../middleware/auth';
const router = express.Router();


router.post('/signup',Signup);
router.post('/signin',signin);
router.get('/',authMiddleware,getUser)
router.post('/',authMiddleware,createUser)
router.get('/:userId',authMiddleware,findUserByID);
router.put('/:userId',authMiddleware,updateUserByID);
router.delete('/:userId',authMiddleware,deleteUserByID);
router.post("/:userId/chatbots",authMiddleware,createChatbotForUser)
router.get("/:userId/chatbots",authMiddleware,getAllChatbots)

export default router