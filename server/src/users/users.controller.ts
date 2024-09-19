import { Controller, Post, Body, Get,Put,Delete, Param, Patch,NotFoundException } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'src/users/user.schema';

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

    @Get(':userId/books-details')
    async getBooksDetails(@Param('userId') userId: Types.ObjectId) {
        return this.userService.getBooksDetailsWithAuthors(userId);
    }

    @Patch(':userId/books/:bookId')
    async addBookToUser(
        @Param('userId') userId: Types.ObjectId,
        @Param('bookId') bookId: Types.ObjectId
    ) {
        try {
            return await this.userService.addBookToUser(userId, bookId);
        } catch (error) {
            throw new NotFoundException('User or book not found');
        }
    }

    @Patch(':userId/favBook/:bookId')
    setFavoriteBook(@Param('userId') userId: Types.ObjectId, @Param('bookId') bookId: Types.ObjectId) {
        return this.userService.setFavoriteBook(userId, bookId);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: Types.ObjectId): Promise<{ message: string }> {
        try {
            await this.userService.deleteUser(id);
            return { message: 'User has been successfully deleted' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User not found');
            }
            throw error; // זרוק חריגות אחרות כפי שהן
        }
    } 

    @Put(':id')
    async updateUser(
        @Param('id') id: Types.ObjectId,
        @Body() updateData: Partial<Omit<User, 'userNumber'>>
    ) {
        const userObjectId = new Types.ObjectId(id);
        return this.userService.updateUser(userObjectId, updateData);
    }
}
