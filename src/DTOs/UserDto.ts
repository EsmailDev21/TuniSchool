import { Timestamp } from "typeorm";

export interface UserDto{
    id:number,
    username:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    hashedRt: string,
    birthDate:Date,
    joined:Timestamp,
}