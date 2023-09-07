import { Response } from "express";
import { IReq } from "../Types/express";
import { IUser } from "./interface";
import { userService } from "./services";
import HttpStatusCodes from "../app-constants/HttpStatusCodes";
import AppConstants from "../app-constants/custom";



class UserController{

  async createUser(req: IReq, res: Response) {
    let payload:IUser = req.body
    try {
      let userdData = await userService.create(payload)
      return res.status(HttpStatusCodes.OK).json({userdData})

    } catch (err: any) {
      console.log("Error:::>>", err.message)
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(AppConstants.SERVER_ERROR)
    }
  }

  async login(req: IReq, res: Response) {
    const user:IUser = req.body;
    try {
      const userToken = await userService.login(user);

      if (userToken === null ) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({userToken});
      }
      res.status(HttpStatusCodes.OK).json({userToken});

    } catch(err: any) {
      console.log("Error:::>>", err.message)
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(AppConstants.SERVER_ERROR)
    }
  }
}

export const userCTRL = new UserController()