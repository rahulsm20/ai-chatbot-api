import EndUserModel from "../models/EndUser.model";

interface endUser{
    id:string,
    email:string,
    name:string,
}

export const createEndUser = async (user: endUser) => {
  try {
    const record = await EndUserModel.create(user);
    return record;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);
  }
};

export const getAllEndUsers = async () => {
  try {
    const users = await EndUserModel.findAll();
    return users;
  } catch (err) {
    throw new Error(`Error finding user: ${err}`);
  }
};

export const getEndUserByID = async (id: string) => {
  try {
    const user = await EndUserModel.findOne({ where: { id: id } });
    if(user){
        return user;
    }
    throw new Error
  } catch (err) {
    throw new Error("Error finding user");
  }
};

export const updateEndUser = async (id: string, updateData: any) => {
  try {
    const [numAffectedRows] = await EndUserModel.update(updateData, {
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

export const deleteEndUser = async (id: string) => {
  try {
    const deletedUser = await EndUserModel.destroy({ where: { id: id } });
    if (deletedUser) {
      return "User deleted successfully";
    } else {
      return "Failed to delete user";
    }
  } catch (err) {
    throw new Error("Failed to delete user: " + err);
  }
};