import bcrypt from "bcrypt";
import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import ChatbotModel from "../models/Chatbot.model";
import {
  createSuperUser,
  createUserHandler,
  deleteUser,
  findSuperUser,
  getAllUsers,
  getUserByID,
  updateUser,
} from "../utils/users";

export const Signup = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const ReqUser = { id: id, email: email, password: hashedPassword };
    const user = await createSuperUser(ReqUser);
    res.status(201).json({ user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).send({ Error: "Signup failed" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if(!email||!password){
    res.status(400).json({Error:"Please enter a valid credentials"})
    return
  }
  try {
    const user = await findSuperUser(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (!isPasswordCorrect) {
        res.status(404).json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign(user.dataValues, process.env.JWT_SECRET || "");
      res.cookie("Authorization", "Bearer " + token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
      });
      res.status(200).json({Success:"Logged in successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "" + error });
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
    const { userId } = req.params;
    const { email, name } = req.body;
    if (!email || !name) {
      res.status(400).json("Please enter credentials");
      return;
    }
    const user = await updateUser(userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("" + error);
  }
};

export const deleteUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json("" + err);
  }
};

export const createChatbotForUser = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { userId } = req.params;
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const user = await createUserHandler({ id, ...req.body });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json("" + err);
  }
};
