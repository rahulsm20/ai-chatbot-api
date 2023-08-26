import express from 'express';
import { deleteConversationByID, findConversationtByID, updateConversationByID } from '../controllers/conversations';
const router = express.Router();

router.get('/:conversationId',findConversationtByID);
router.put('/:conversationId',updateConversationByID);
router.delete('/:conversationId',deleteConversationByID);

export default router