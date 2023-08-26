import express from 'express';
import { createNewEndUser, deleteEndUserByID, findEndUserByID, getEndUsers, updateEndUserByID } from '../controllers/endUsers';
const router = express.Router();


router.post('/',createNewEndUser);
router.get('/',getEndUsers)
router.get('/:endUserId',findEndUserByID);
router.put('/:endUserId',updateEndUserByID);
router.delete('/:endUserId',deleteEndUserByID);

export default router