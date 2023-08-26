import { Request,Response } from "express";
import { createEndUser, deleteEndUser, getAllEndUsers, getEndUserByID, updateEndUser } from "../utils/endusers";
import { v4 as uuidv4 } from "uuid";

export const getEndUsers = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.per_page as string) || 10;
      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;
  
      const users = await getAllEndUsers();
  
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
  
  export const findEndUserByID = async (req: Request, res: Response) => {
    try {
      const { endUserId } = req.params;
      const user = await getEndUserByID(endUserId);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ Error: "Failed to get user" });
    }
  };
  
  export const updateEndUserByID = async (req: Request, res: Response) => {
    try {
      const { endUserId } = req.params;
      const { email, name } = req.body;
      if (!email && !name) {
        res.status(400).json("Please enter credentials");
        return;
      }
      const user = await updateEndUser(endUserId, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json("" + error);
    }
  };
  
  export const deleteEndUserByID = async (req: Request, res: Response) => {
    try {
      const { endUserId } = req.params;
      const deletedUser = await deleteEndUser(endUserId);
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(400).json("" + err);
    }
  };
  

export const createNewEndUser = async(req:Request,res:Response)=>{
    try{
        // const {endUserId} = req.params;
        const id = uuidv4();
        const endUser = {...req.body,id:id}
        const newUser = await createEndUser(endUser);
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json(""+err)
    }
}