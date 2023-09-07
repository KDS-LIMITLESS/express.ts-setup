import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";
import { _uDB } from "./model";
import tokens from "../middlewares/tokens";
import { LogError } from "../utils/errors";
import { IUser } from "./interface";


class UserService {

  /**
   * user service function for creating new users
   * @param payload IUser
   * @returns 
   */
  async create(payload: IUser): Promise<IUser> {
    // QUERY DB, SEE IF USERNAME ALREADY EXISTS
    if(await _uDB.getUser(payload.username)) {
      throw new LogError(
        HttpStatusCodes.BAD_REQUEST, 
        AppConstants.USER_EXISTS
      )
    }
    // USERNAME DOES NOT EXIST
    let response = (await _uDB.createUser(payload)).toJSON()
    // DELETE THE PASSWORD HASH FROM THE RESPONSE OBJECT BEING SENT BACK TO THE CLIENT
    delete response['passwordHash']
    return response
  }

  /**
   * user service login function
   * @param payload IUser
   * @returns 
   */
  async login(payload: IUser): Promise<string | null> {
    // ALL PROMISES MUST RETURN. RETURN NULL IF ANY FAILS
    const [_, isUser ]= await Promise.all([
      await _uDB.getUser(payload.username),
      await _uDB.compareUserPassword(payload.password, payload)
    ])
    // USER FOUND BUT PASSWORD DOES NOT MATCH
    if (isUser === null) {
      return AppConstants.INVALID_LOGIN_DETAILS, null
    } else {
      return tokens.generateToken(isUser.username, isUser.imageUrl)
    }
  }

  /**
   * user service uploadImage function. Depends on the uploads module 
   */
  async uploadImage() {}
}

export const userService = new UserService