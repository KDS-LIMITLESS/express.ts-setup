import { IUser } from "../user.module/interface";
import { sequelize } from "../db.connection";
import { DataTypes, Model } from "sequelize";
import bcrypt  from 'bcrypt'


class User extends Model {
  public username!: string;
  public imageUrl!: string;
  public passwordHash!: string
}


class UserModel {

  constructor () {
    User.init ({
      username: {
        type: DataTypes.STRING, allowNull: false
      },
      passwordHash: {
        type: DataTypes.STRING, allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING, allowNull: false
      }
    }, {
      sequelize,
      modelName: 'users'
    });
  }

  /**
   * db function for creating new users.
   * @param user user object to add to db. Must matces IUser interface
   * @returns Promise<User>
   */
  async createUser(user: IUser): Promise<User> {
    const pwHash = await this.hashPassword(user.password)
    return User.create({
      username: user.username, 
      passwordHash: pwHash,
      imageUrl: user.imageUrl
    })
  }

  /**
   * db function for performing find queries on the username column.
   * @param username search username 
   * @returns Promise<User | null>
   */
  async getUser(username: String): Promise<User | null> {
    const user = await User.findOne(
      { where: { username }}
    )
    return user ? user : null
  
  }

  /**
   * function to hash given text usuing bcrypt library
   * @param password password text to hash
   * @returns Promise<string>
   */
  async  hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
  }

  /**
   * function to check users plain password against the hash stored in db
   * @param pwd plain password to compare
   * @param email users email 
   * @returns user if pwd matches password in db
   */
  async compareUserPassword(pwd: string, user: IUser): Promise<User | null> {
    let findUser = await User.findOne(
      { where:{username: user.username }}
    )    
    return findUser ? 
      await bcrypt.compare(pwd, findUser?.passwordHash!) ? findUser : null
    : null
  }
}
  






export const _uDB = new UserModel()


// write user APIs
// Implement JWT
// write post APIs
// implement upload and setup aws s3
// documentation
// readme

