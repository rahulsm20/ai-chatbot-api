import ChatbotModel from "../models/Chatbot.model";
import { ChatbotAttributes } from "./types";

export const createChatbot = async (chatbot: ChatbotAttributes) => {
  try {
    const record = await ChatbotModel.create(chatbot);
    return record;
  } catch (err) {
    throw new Error(`Error creating user: ${err}`);  
}
};

export const getAllChatbotsForUser = async (id:string) => {
    try{
        const chatbots = await ChatbotModel.findAll({where:{user_id:id}});
        return chatbots
    }
    catch(err){
        throw new Error(`Error finding user: ${err}`);
    }
}

export const getChatbotByID = async(id:string)=>{
    try{
        const chatbot = await ChatbotModel.findOne({where:{chatbotId:id}})
        if(chatbot){
            return chatbot
        }
        throw new Error
    }
    catch(err){
        throw new Error('Error finding user')
    }
}

export const updateChatbot = async(id:string,updateData:any)=>{
    try{
        const [numAffectedRows] = await ChatbotModel.update(updateData, {
            where: { chatbotId:id },
          });
      
          if (numAffectedRows === 0) {
            throw new Error("Chatbot not found or update didn't affect any rows.");
          }
          return "User updated successfully";
        } catch (err:any) {
          throw new Error(""+ err.message);
        }
}

export const deleteChatbot = async(id:string)=>{
    try{
        const result= await ChatbotModel.destroy({where:{chatbotId:id}})
        if(result){
            return "Chatbot deleted successfully"
        }
        else{
            return "Failed to delete chatbot"
        }
    }
    catch(err){
        throw new Error("Failed to delete chatbot: "+err)
    }
}