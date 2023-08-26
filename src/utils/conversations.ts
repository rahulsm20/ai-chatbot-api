import ConversationModel from "../models/Conversation.model";
import { ConversationAttributes } from "./types";

export const createConversation = async (conversation: ConversationAttributes) => {
  try {
    const record = await ConversationModel.create(conversation);
    return record;
  } catch (err) {
    throw new Error(`${err}`);  
}
};

export const fetchConversations = async (id:string) => {
    try{
        const chatbots = await ConversationModel.findAll({where:{chatbot_id:id}});
        return chatbots
    }
    catch(err){
        throw new Error(`Error finding user: ${err}`);
    }
}

export const getConversationByID = async(id:string)=>{
    try{
        const conversation = await ConversationModel.findOne({where:{conversation_id:id}})
        if(conversation){
            return conversation
        }
        throw new Error
    }
    catch(err){
        throw new Error('Error finding conversation')
    }
}

export const updateConversation = async(id:string,updateData:any)=>{
    try{
        const [numAffectedRows] = await ConversationModel.update(updateData, {
            where: { conversation_id:id },
          });
      
          if (numAffectedRows === 0) {
            throw new Error("Conversation not found or update didn't affect any rows.");
          }
          return "Conversation updated successfully";
        } catch (err:any) {
          throw new Error(""+ err.message);
        }
}

export const deleteConversation = async(id:string)=>{
    try{
        const result= await ConversationModel.destroy({where:{conversation_id:id}})
        if(result){
            return "Conversation deleted successfully"
        }
        else{
            return "Failed to delete conversation"
        }
    }
    catch(err){
        throw new Error("Failed to delete conversation: "+err)
    }
}