import {DataTypes, Model } from 'sequelize'
import client from '../db/connect'
import { User } from '../types'

export default class UserModel extends Model<User> {}

UserModel.init(
  {
  id:{
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
    defaultValue: DataTypes.UUIDV4,
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
  sequelize:client,
  tableName:'users'
})