import {DataTypes, Model } from 'sequelize'
import client from '../db/connect'
import UserModel from './User.model'
import { ChatbotAttributes } from '../types'

export default class ChatbotModel extends Model<ChatbotAttributes> {}

ChatbotModel.init(
  {
  chatbotId:{
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id:{
    type:DataTypes.UUIDV4,
    allowNull:false,
    defaultValue: DataTypes.UUIDV4,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  description:{
    type:DataTypes.STRING
  }
},{
  sequelize:client,
  tableName:'chatbots'
})

ChatbotModel.belongsTo(UserModel,{
  foreignKey:"user_id",
  targetKey:"id"
})
