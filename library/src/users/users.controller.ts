import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from '../DTO/CreateUser.DTO';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.getAllUsers();
    }

    @Get(':userNumber')
    findOne(@Param('userNumber') userNumber: number) {
        return this.userService.getUserByNumber(userNumber);
    }

    @Patch(':userId/books/:bookId')
    addBookToUser(@Param('userId') userId: string, @Param('bookId') bookId: string) {
        return this.userService.addBookToUser(userId, bookId);
    }

    @Patch(':userId/favBook/:bookId')
    setFavoriteBook(@Param('userId') userId: string, @Param('bookId') bookId: string) {
        return this.userService.setFavoriteBook(userId, bookId);
    }
}
