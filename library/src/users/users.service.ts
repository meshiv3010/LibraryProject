import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model ,Types} from 'mongoose';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../DTO/CreateUser.DTO';
import { Book } from '../schema/book.schema';
import { BookService } from 'src/books/books.service';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                @InjectModel(Book.name) private bookModel: Model<Book>,
                private readonly bookService: BookService) {}

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

    async addBookToUser(userId: Types.ObjectId, bookId: Types.ObjectId): Promise<User> {
        // Update the User to add the bookId to readBooks
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { readBooks: bookId } },
            { new: true }
        ).exec();

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Update the Book to add the userId to readers
        const book = await this.bookModel.findByIdAndUpdate(
            bookId,
            { $addToSet: { readers: userId } },
            { new: true }
        ).exec();

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return user;
    }

    async setFavoriteBook(userId: string, bookId: string): Promise<User> {
        return this.userModel.findByIdAndUpdate(userId, { favBook: bookId }, { new: true }).populate('favBook').exec();
    }

    async getBooksDetailsWithAuthors(userId: string): Promise<{ book: Book; authorName: string }[]> {
        const user = await this.userModel.findById(userId).populate('readBooks').exec();
    
        if (!user || !user.readBooks || user.readBooks.length === 0) {
            throw new NotFoundException('User or books not found');
        }
    
        // עבור כל מזהה ספר, קבל את פרטי הספר ואת שם הסופר
        const booksDetails = await Promise.all(
            user.readBooks.map(async (bookId: Types.ObjectId) => { // שים לב לשימוש ב-Types.ObjectId
                if (!bookId) {
                    throw new NotFoundException('Book ID not found');
                }
    
                // קבל את פרטי הספר לפי מזהה
                const book = await this.bookService.getBookById(bookId.toString());
    
                if (!book) {
                    throw new NotFoundException('Book not found');
                }
    
                // קבל את שם הסופר של הספר
                const authorName = await this.bookService.getAuthorByBookId(bookId.toString());
    
                if (!authorName) {
                    throw new NotFoundException('Author name not found');
                }
    
                return {
                    book,
                    authorName
                };
            })
        );
    
        return booksDetails;
    }
}