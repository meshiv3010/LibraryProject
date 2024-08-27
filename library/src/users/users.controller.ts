import { Controller, Post, Body, Get,Put,Delete, Param, Patch,NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from './users.service';
import { CreateUserDto } from '../DTO/CreateUser.DTO';
import { User } from 'src/schema/user.schema';

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
    async addBookToUser(
        @Param('userId') userId: string,
        @Param('bookId') bookId: string
    ) {
        try {
            const userObjectId = new Types.ObjectId(userId);
            const bookObjectId = new Types.ObjectId(bookId);
            return await this.userService.addBookToUser(userObjectId, bookObjectId);
        } catch (error) {
            throw new NotFoundException('User or book not found');
        }
    }

    @Patch(':userId/favBook/:bookId')
    setFavoriteBook(@Param('userId') userId: string, @Param('bookId') bookId: string) {
        return this.userService.setFavoriteBook(userId, bookId);
    }

    @Get(':userId/books-details')
    async getBooksDetails(@Param('userId') userId: string) {
        return this.userService.getBooksDetailsWithAuthors(userId);
    }

    @Delete(':userId/favBook/:bookId')
    async removeFavBook(
        @Param('userId') userId: string,
        @Param('bookId') bookId: string
    ) {
        const userObjectId = new Types.ObjectId(userId);
        const bookObjectId = new Types.ObjectId(bookId);
        return this.userService.removeFavBook(userObjectId, bookObjectId);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateData: Partial<Omit<User, 'userNumber'>>
    ) {
        const userObjectId = new Types.ObjectId(id);
        return this.userService.updateUser(userObjectId, updateData);
    }
}
