import "dotenv/config";
import { Request, Response } from "express";
import { deleteChatbot, getAllChatbotsForUser, getChatbotByID, updateChatbot } from "../utils/chatbot";
import { createConversation, deleteConversation, fetchConversations, getConversationByID, updateConversation } from "../utils/conversations";
import { v4 as uuidv4 } from "uuid";

export const getAllConversations = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const {chatbotId} = req.params;
    const chatbots = await fetchConversations(chatbotId);

    const paginatedUsers = chatbots.slice(startIndex, endIndex);

    const response = {
      page,
      per_page: perPage,
      total: chatbots.length,
      data: paginatedUsers,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ Error: "Failed to get conversations" });
  }
};

export const findConversationtByID = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const chatbot = await getConversationByID(conversationId);
    res.status(200).json(chatbot);
  } catch (error) {
    res.status(400).json({ Error: "Failed to get chatbot" });
  }
};

export const updateConversationByID = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { name, description } = req.body;
    if (!name && !description) {
      res.status(400).json("Please enter details");
      return;
    }
    const chatbot = await updateConversation(conversationId, req.body);
    res.status(200).json(chatbot);
  } catch (error) {
    res.status(400).json("" + error);
  }
};

export const deleteConversationByID = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const deletedChatbot = await deleteConversation(conversationId);
    res.status(200).json(deletedChatbot);
  } catch (err) {
    res.status(400).json("" + err);
  }
};

export const createNewConversation = async(req:Request,res:Response)=>{
  try{
    const {chatbotId} = req.params;
    const id = uuidv4();
    const convData={...req.body,chatbot_id:chatbotId,conversation_id:id};
    const newConversation = await createConversation(convData)
    const contentarray = newConversation.content.split(';')
    console.log(contentarray)
    res.status(201).json(newConversation)
  }
  catch(err){
    res.status(400).json(""+err)
  }
}