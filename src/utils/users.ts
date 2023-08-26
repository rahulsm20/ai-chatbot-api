import SuperUserModel from "../models/SuperUser.model";
import UserModel from "../models/User.model";
import { SuperUser, User } from "./types";

export const createUserHandler = async (user: User) => {
  try {
    const record = await UserModel.create(user);
    return record;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);
  }
};

export const createSuperUser = async(user:SuperUser)=>{
  try{
    const record = await SuperUserModel.create(user)
    return record
  }
  catch(err){
    throw new Error(`Error creating user: ${err}`)
  }
}

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
    // console.log(id)
    console.log(id)
    const deletedUser = await UserModel.destroy({ where: { id:id } });
    if (deletedUser) {
      return "User deleted successfully";
    } else {
      return "Failed to delete user";
    }
  } catch (err) {
    throw new Error("Failed to delete user: " + err);
  }
};

export const findSuperUser = async(email:string)=>{
  try{
    if(!email){
      throw new Error("Please enter valid email")
    }
    const user  = await SuperUserModel.findOne({where:{email:email}})
    if(user){
      return user
    }
  }
  catch(err){
    throw new Error(""+err)
  }
}