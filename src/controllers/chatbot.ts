import "dotenv/config";
import { Request, Response } from "express";
import { deleteChatbot, getAllChatbotsForUser, getChatbotByID, updateChatbot } from "../utils/chatbot";

export const getAllChatbots = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const {userId} = req.params;
    const chatbots = await getAllChatbotsForUser(userId);

    const paginatedUsers = chatbots.slice(startIndex, endIndex);

    const response = {
      page,
      per_page: perPage,
      total: chatbots.length,
      data: paginatedUsers,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ Error: "Failed to get chatbots" });
  }
};

export const findChatbotByID = async (req: Request, res: Response) => {
  try {
    const { chatbotId } = req.params;
    const chatbot = await getChatbotByID(chatbotId);
    res.status(200).json(chatbot);
  } catch (error) {
    res.status(400).json({ Error: "Failed to get chatbot" });
  }
};

export const updateChatbotByID = async (req: Request, res: Response) => {
  try {
    const { chatbotId } = req.params;
    const { name, description } = req.body;
    if (!name && !description) {
      res.status(400).json("Please enter details");
      return;
    }
    const chatbot = await updateChatbot(chatbotId, req.body);
    res.status(200).json(chatbot);
  } catch (error) {
    res.status(400).json("" + error);
  }
};

export const deleteChatbotByID = async (req: Request, res: Response) => {
  try {
    const { chatbotId } = req.params;
    const deletedChatbot = await deleteChatbot(chatbotId);
    res.status(200).json(deletedChatbot);
  } catch (err) {
    res.status(400).json("" + err);
  }
};
