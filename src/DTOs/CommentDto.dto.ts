import { PostDto } from "./PostDto.dto";
import { UserDto } from "./UserDto";
import { Timestamp } from "typeorm";

export interface CommentDto{
    id:number;
    post:PostDto;
    publisher:UserDto;
    body:string;
    posted:Timestamp;
    effective:boolean;
}