import { PhotoTypeDto } from "./PhotoTypeDto.dto";

export interface PhotoDto{
    id:number;
    src:string;
    type:PhotoTypeDto;
}