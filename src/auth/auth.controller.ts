import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthDto } from 'src/DTOs/AuthDto.dto';
import { UserDto } from 'src/DTOs/UserDto';
import { Token } from 'src/types/token.type';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('local/signup')
    async signUpLocal(@Body() data:UserDto): Promise<Token>{
       return await this.authService.signUpLocal(data);

    }
    @Post('local/login')
    async loginLocal(@Body() auth:AuthDto):Promise<Token>{
        return await this.authService.loginLocal(auth);
    }

    @Get('logout')
    async logout():Promise<any>{
        return await this.authService.logout();
    }
    @Get('refresh')
    async refreshTokens():Promise<any>{
        return await this.authService.refreshTokens();
    }
}
