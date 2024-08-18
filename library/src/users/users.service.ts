import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../DTO/CreateUser.DTO';
import { Book } from '../schema/book.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().populate('readBooks').populate('favBook').exec();
    }

    async getUserByNumber(userNumber: number): Promise<User> {
        return this.userModel.findOne({ userNumber }).populate('readBooks').populate('favBook').exec();
    }

    async addBookToUser(userId: string, bookId: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(userId, { $addToSet: { readBooks: bookId } }, { new: true }).populate('readBooks').exec();
    }

    async setFavoriteBook(userId: string, bookId: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(userId, { favBook: bookId }, { new: true }).populate('favBook').exec();
    }
}
