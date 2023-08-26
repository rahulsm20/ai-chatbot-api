import express from 'express';
import { deleteChatbotByID, findChatbotByID, updateChatbotByID } from '../controllers/chatbot';
import { createNewConversation, getAllConversations } from '../controllers/conversations';
const router = express.Router();

router.get('/:chatbotId',findChatbotByID);
router.put('/:chatbotId',updateChatbotByID);
router.delete('/:chatbotId',deleteChatbotByID);
router.post("/:chatbotId/conversations",createNewConversation);
router.get("/:chatbotId/conversations",getAllConversations);

export default router