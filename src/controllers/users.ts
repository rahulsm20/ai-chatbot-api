import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.model";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import {
  createUser,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../utils/users";
import ChatbotModel from "../models/Chatbot.model";

export const Signup = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const ReqUser = { id: id, email: email, password: hashedPassword };
    const user = await createUser(ReqUser);
    const token = jwt.sign(user.dataValues, process.env.JWT_SECRET || "");
    res.cookie("Authorization", "Bearer " + token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });
    res.status(201).json({ user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).send({ Error: "Signup failed" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const users = await getAllUsers();

    const paginatedUsers = users.slice(startIndex, endIndex);

    const response = {
      page,
      per_page: perPage,
      total: users.length,
      data: paginatedUsers,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ Error: "Failed to get users" });
  }
};

export const findUserByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserByID(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ Error: "Failed to get user" });
  }
};

export const updateUserByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400).json("Please enter credentials");
      return;
    }
    const user = await updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("" + error);
  }
};

export const deleteUserByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json("" + err);
  }
};

export const createChatbotForUser = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { userId } = req.params;
    const { name, description } = req.body;
    const newUser = await ChatbotModel.create({
      id: id,
      user_id: userId,
      ...req.body,
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json("" + err);
  }
};
