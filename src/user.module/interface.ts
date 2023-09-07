export interface IUser {
  username: string,
  password: string,
  imageUrl: string,
}

export interface IUpload {
  uploadFile() : void
}