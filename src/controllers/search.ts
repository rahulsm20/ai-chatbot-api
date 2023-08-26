import { Request, Response } from "express";
import ConversationModel from "../models/Conversation.model";
import { Op } from "sequelize";

export const searchConversations = async (req: Request, res: Response) => {
  try {
    const { keywords } = req.query;
    var conversation;
    if (keywords) {
      conversation = await ConversationModel.findAll({
        where: {
          content: { [Op.like]: `%${keywords}%` },
        },
      });
    }
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    return res.json(conversation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the conversation" });
  }
};
