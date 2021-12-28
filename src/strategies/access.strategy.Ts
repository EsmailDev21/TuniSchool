import { Injectable } from "@nestjs/common";
import { JwtSecretRequestType } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./jwt.constants";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.atSecret
        }
        )
    }
    validate(payload: any){
        return payload;
    }
}