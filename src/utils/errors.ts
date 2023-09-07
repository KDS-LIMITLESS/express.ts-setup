import HttpStatusCodes from '../app-constants/HttpStatusCodes';

export class LogError extends Error {
  status: HttpStatusCodes;

  constructor(
    status:HttpStatusCodes, message:string , 
  ){
    super(message);
    this.status = status;
  }
}