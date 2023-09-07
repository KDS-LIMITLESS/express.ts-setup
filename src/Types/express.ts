import * as e from 'express';
import { IUser } from '../user.module/interface';


export interface IReq<T = any, U = any> extends e.Request  {
    user?: U
}

export declare type UserDataResponse = Omit<IUser, 'passwordHash'>
