import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { BookService } from 'src/books/books.service';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private readonly bookService: BookService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().populate('favBook').populate({ path: 'readBooks', populate: { path: 'author' } }).exec();
        return users;
    }

    async getBooksDetailsWithAuthors(userId: Types.ObjectId): Promise<User> {
        const user = await this.userModel.findById(userId).populate('favBook').populate({ path: 'readBooks', populate: { path: 'author' } }).exec();
        return user;
    }

    async addBookToUser(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<User> {
        // Update the user to add the bookId to readBooks
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { readBooks: bookId } }, // Adding bookId if it doesn't exist
            { new: true } // Return the updated user
        ).exec();

        if (!user) {
            throw new NotFoundException('User not found'); // If no user is found
        }

        // Update the book to add the user to readers
        await this.bookService.addReaderToBook(bookId, userId);

        // Retrieving the user with the book details populated in readBooks
        const populatedUser = await this.userModel.findById(user._id)
            .populate('readBooks') // Populate the book details
            .exec();

        return populatedUser; // Return the user with the populated books
    }

    async setFavoriteBook(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<User> {
        // Retrieve the user from the DB
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const updateData = (user.favBook && user.favBook.equals(bookId))
            ? { favBook: null }
            : { favBook: bookId };
        // Update the user
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true })
            .populate('favBook')
            .exec();
        return updatedUser;
    }

    async deleteUser(userId: Types.ObjectId): Promise<void> {
        const user = await this.userModel.findById(userId).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.userModel.deleteOne({ _id: userId }).exec();
    }
    async removeBookFromUser(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<User> {
        // Retrieve the user
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        // Check if the submitted book is the preferred book
        const isFavoriteBook = user.favBook && user.favBook.equals(bookId);
    
        // Removing the book from the readBooks list
        const removeFromReadBooks = await this.userModel.updateOne(
            { _id: userId },
            { $pull: { readBooks: bookId } }
        ).exec();
        console.log(`Removed book ${bookId} from user ${userId}:`, removeFromReadBooks);
    
        // If the submitted book is the preferred book, delete it from the faceBook field
        if (isFavoriteBook) {
            const removeFromFavBook = await this.userModel.updateOne(
                { _id: userId },
                { $unset: { favBook: "" } }
            ).exec();
            console.log(`Unset favorite book for user ${userId}:`, removeFromFavBook);
        }
    
        // Update the book to remove the user from the readers list
        const removeReader = await this.bookService.removeReaderFromBook(bookId, userId);
        console.log(`Removed user ${userId} from book ${bookId} readers:`, removeReader);
    
        // Verify that the book has indeed been updated
        const updatedBook = await this.bookService.getBookById(bookId); // Assume `getBookById` returns an updated book
        console.log(`Book readers after update:`, updatedBook?.readers);
    
        // Retrieve the updated user with the book details
        const updatedUser = await this.userModel.findById(userId)
            .populate('favBook')
            .populate({
                path: 'readBooks',
                populate: { path: 'author' }, // verify sure the connectors are also populated
            })
            .lean()
            .exec();
    
        if (!updatedUser) {
            throw new NotFoundException('User not found after update');
        }
    
        console.log(`Updated user data:`, updatedUser);
        return updatedUser;
    }
    
    
    
    async removeBookFromAllUsers(bookId: Types.ObjectId): Promise<void> {
        await this.userModel.updateMany(
            { 
                $or: [
                    { readBooks: bookId },
                    { favBook: bookId } // Also search on favBook
                ]
            },
            { 
                $pull: { readBooks: bookId }, // Delete from readBooks
                $unset: { favBook: "" } //Remove the book from the favBook field
            }
        ).exec();
    }

    async updateUser(userId: Types.ObjectId, updateData: Partial<Omit<User, 'userNumber'>>): Promise<User> {
        // Retrieve the user and remove userNumber from the update
        const user = await this.userModel.findById(userId).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Save the fields for update except for the userNumber field
        Object.assign(user, updateData);

        // Saving the changes
        return user.save();
    }
}
