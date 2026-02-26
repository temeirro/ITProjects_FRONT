import {IUploadedFile} from "./imageconvert.ts";
import {Status} from "../utils/enums";

export interface IImageItem {
    id: number;
    imagePath: string;
}

export interface IRegister {
    userName: string,
    firstName: string,
    lastName: string,
    image: IUploadedFile,
    email: string,
    password: string,
    role: string,
}

export interface IRegisterForm {
    firstName: string;
    lastName: string;
    imagePath: IUploadedFile | null;
    email: string;
    password: string;
}

export interface ILogin {
    userName: string,
    password: string
}
export interface ILoginResult {
    token: string
}

export interface IUser{
    UserName: string,
    FirstName: string,
    LastName: string,
    ImagePath: string,
    Role: string,
    Id: string,
    Email: string,
}

export interface IAccountState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
    isAdmin: boolean,
    status: Status;
}