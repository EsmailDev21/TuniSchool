import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    /**
     *
     */
    constructor(private readonly userService:UserService) {
   
    }
    @Get('all')
    async getAllUser():Promise<UserModel[]>{
        return await this.userService.getAllUsers({});
        
    }

    @Get(':id')
    async getUserById(@Param('id') id):Promise<UserModel>{
        return await this.userService.getUser({id: Number(id)})
    }

    @Post('auth/signup')
    async signUpUser(@Body() user:UserModel):Promise<UserModel>{
        return  await this.userService.createUser(user)
       
    }

    @Put('update/:id')
    async updateUser(@Param('id') id, @Body() user:UserModel):Promise<UserModel>{
        return  await this.userService.updateUser({where:{id:Number(id)} ,data:user})
        
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id): Promise<UserModel>{
        return await this.userService.deleteUser({id: Number(id)})
        
    }

    
  /*  @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req): Promise<UserModel> {
        return this.userService.login(req.user);
    }*/

}
