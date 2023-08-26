export interface User {
    id: string;
    email: string;
    name: string;
  }

export interface SuperUser{
  id:string;
  email:string;
  password:string;
}
export interface ConversationAttributes{
  conversation_id:string;
  chatbot_id:string;
  content:string;
  end_user_id:string|null;
}

export interface ChatbotAttributes{
  chatbotId:string,
  user_id:string,
  name:string,
  description:string 
}

export interface EndUser{
  id:string;
  name:string;
  email:string;
}


export interface UserMessageAttributes{
  conversation_id:string;
  content:string
}


export interface ChatbotMessageAttributes{
  conversation_id:string;
  content:string
}
