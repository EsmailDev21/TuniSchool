import { JwtSecretRequestType } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./jwt.constants";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.rtSecret,
            passReqToCallback:true
        }
        )
    }
    validate(req: Request, payload: any){
        const refreshToken = req.get('authorization').replace('Bearer','').trim();
        return {
            ...payload,
            refreshToken
        }
    }
}