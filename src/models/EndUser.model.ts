import {DataTypes, Model } from 'sequelize'
import client from '../db/connect'
import { EndUser } from '../types'

export default class EndUserModel extends Model<EndUser> {}

EndUserModel.init(
  {
  id:{
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false,
    defaultValue: DataTypes.UUIDV4,
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
  }
},{
  sequelize:client,
  tableName:'end_users'
})