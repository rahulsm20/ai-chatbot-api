import { DataTypes, Model } from 'sequelize'
import client from '../db/connect'
import { ConversationAttributes } from '../utils/types'
import ChatbotModel from './Chatbot.model'

export default class ConversationModel extends Model<ConversationAttributes> {
  content: any
}

ConversationModel.init(
  {
  conversation_id:{
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
    defaultValue: DataTypes.UUIDV4,
  },
  chatbot_id:{
    type:DataTypes.UUIDV4,
    allowNull:false,
    defaultValue: DataTypes.UUIDV4,
  },
  content:{
    type:DataTypes.STRING,
    allowNull:false
  },
  end_user_id:{
    type:DataTypes.UUIDV4,
    allowNull:false
  }
},{
  sequelize:client,
  tableName:'conversations'
})

ConversationModel.belongsTo(ChatbotModel,{
  foreignKey:"chatbot_id",
  targetKey:"chatbotId"
})
