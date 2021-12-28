import { CommentDto } from "./CommentDto.dto";
import { PhotoDto } from "src/DTOs/PhotoDto.dto";

export interface PostDto{
    id:number;
    title:string;
    content:string;
    photos:PhotoDto[];
    comments:CommentDto[];
}