import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController 
{
    constructor (private readonly srv : UsersService){}


    
   /* @Get(':userNumber')
    getUserByUserNumber(@Param('userNumber') userNumber : number)
    {
        return this.srv.getUserByUserNumber(userNumber);
    }*/
    
}
