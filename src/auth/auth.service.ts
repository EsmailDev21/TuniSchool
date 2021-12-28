import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/DTOs/UserDto';
import { UserService } from 'src/user/user.service';
import {Token} from '../types/token.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/DTOs/AuthDto.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,
         private readonly prisma:PrismaService,
         private readonly jwtService : JwtService){
    }
    

    async loginLocal(auth:AuthDto):Promise<Token>{
        const user = await this.userService.getUser({email:auth.email});
        if (!user) throw new UnauthorizedException();
        if(await bcrypt.compare(auth.password,user.password)===false) throw new UnauthorizedException()
        const tokens = await this.getTokens(user.id,user.email);
        console.log(tokens.refreshToken)
        const hashedRt = await this.storeHashedRefreshToken(user.id, tokens.refreshToken)
        return {accessToken : tokens.accessToken, refreshToken : hashedRt}
  
    }

    async getTokens(userId:number, email: string):Promise<Token>{
        const [accessToken, refreshToken] = await Promise.all(
            [
                this.jwtService.signAsync(
                    {
                        id: userId,
                        email,
                    },
                    {
                        secret:'at-secret',
                        expiresIn: 60*15
                    }
                ),
                this.jwtService.signAsync({
                    id:userId,
                    email
                },
                {
                    secret:'rt-secret',
                    expiresIn: 60*60*24*7
                })
            ]
        )
        return {
            accessToken : accessToken,
            refreshToken : refreshToken
        }
    }

    async storeHashedRefreshToken(userID:number, rt: string):Promise<string>{
        const hashedRefreshToken = await bcrypt.hashSync(rt,10);
        await this.userService.updateUser({
            where:{
                id: userID
            },
            data:{
                hashedRt: hashedRefreshToken
            }
        })
        return hashedRefreshToken;
    }
    async signUpLocal(data:UserDto):Promise<Token>{
        const user = await this.userService.createUser(
            data
        );
        if(!user) throw new UnauthorizedException();
        const tokens = await this.getTokens(user.id,user.email);
        
        console.log(tokens.refreshToken);
        const hashedRt = await this.storeHashedRefreshToken(user.id, tokens.refreshToken)
         return {accessToken : tokens.accessToken, refreshToken : hashedRt}
       }
    async logout():Promise<any>{
        return await {message : "Logout Route works"}
    }
    async refreshTokens():Promise<any>{
        return await {message : "Refrsh tokens Route works"}
    }
      
}
