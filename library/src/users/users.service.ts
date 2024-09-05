import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model ,ObjectId,Types} from 'mongoose';
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
        const users = await this.userModel.find().populate('favBook').populate({path: 'readBooks', populate:{path: 'author'}}).exec();

        return users;
    }

    async getBooksDetailsWithAuthors(userId: Types.ObjectId): Promise<User > {
        const user = await this.userModel.findById(userId).populate('favBook').populate({path: 'readBooks', populate:{path: 'author'}}).exec();
        return user;
    }

    async addBookToUser(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<User> {
        // עדכון המשתמש כדי להוסיף את ה-bookId ל-readBooks
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { readBooks: bookId } },
            { new: true }
        ).exec();
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        // שליפת המשתמש עם אכלוס פרטי הספרים ב-readBooks
        const populatedUser = await this.userModel.findById(user._id)
            .populate('readBooks') // אכלוס פרטי הספרים
            .exec();
    
        return populatedUser;
    }
    
    async setFavoriteBook(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<User> {
        // שליפת המשתמש מהמאגר
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const updateData = (user.favBook && user.favBook.equals(bookId))
        ? { favBook: null }
        : { favBook: bookId };
        // עדכון המשתמש
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

    async removeBookFromAllUsers(bookId: Types.ObjectId): Promise<void> {
        await this.userModel.updateMany(
            { 
                $or: [
                    { readBooks: bookId },
                    { favBook: bookId } // מחפשים גם ב-favBook
                ]
            },
            { 
                $pull: { readBooks: bookId }, // מוחקים מה-readBooks
                $unset: { favBook: "" } // מסירים את הספר משדה favBook
            }
        ).exec();
    }
    async updateUser(userId: Types.ObjectId, updateData: Partial<Omit<User, 'userNumber'>>): Promise<User> {
        // שליפת המשתמש והוצאת userNumber מהעדכון
        const user = await this.userModel.findById(userId).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // שמירת השדות לעדכון פרט לשדה userNumber
        Object.assign(user, updateData);

        // שמירת השינויים
        return user.save();
    }
}