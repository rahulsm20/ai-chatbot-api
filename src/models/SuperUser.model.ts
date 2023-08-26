import { DataTypes, Model } from 'sequelize'
import client from '../db/connect'
// import { SuperUser } from '../utils/types'
interface SuperUser{
  id:string;
  email:string;
  password:string;
}
export default class SuperUserModel extends Model<SuperUser> {}

SuperUserModel.init(
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
  tableName:'super_users'
})