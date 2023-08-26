import ChatbotModel from "../models/Chatbot.model";
import UserModel from "../models/User.model";
import { User } from "./types";

export const createUser = async (user: User) => {
  try {
    const record = await UserModel.create(user);
    return record;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.findAll();
    return users;
  } catch (err) {
    throw new Error(`Error finding user: ${err}`);
  }
};

export const getUserByID = async (id: string) => {
  try {
    const user = await UserModel.findOne({ where: { id: id } });
    if(user){
        return user;
    }
    throw new Error
  } catch (err) {
    throw new Error("Error finding user");
  }
};

export const updateUser = async (id: string, updateData: any) => {
  try {
    const [numAffectedRows] = await UserModel.update(updateData, {
      where: { id },
    });

    if (numAffectedRows === 0) {
      throw new Error("User not found or update didn't affect any rows.");
    }
    return "User updated successfully";
  } catch (err:any) {
    throw new Error(""+ err.message);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await UserModel.destroy({ where: { id: id } });
    if (deletedUser) {
      return "User deleted successfully";
    } else {
      return "Failed to delete user";
    }
  } catch (err) {
    throw new Error("Failed to delete user: " + err);
  }
};

export const createNewChatbot=async(id:string)=>{
  try{
    // const name 
    const newChatbot = await ChatbotModel.create()
  }
  catch(err){
    throw new Error("Failed to create new chatbot: "+err)
  }
}