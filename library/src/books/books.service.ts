import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'; // ייבוא Inject ו-forwardRef
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from './book.schema';
import { Author } from '../authors/author.schema'; 
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorService } from 'src/authors/authors.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService, // שימוש ב-forwardRef
    @Inject(forwardRef(() => AuthorService)) private readonly authorService: AuthorService
) {}



    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(createBookDto);
        return newBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return this.bookModel.find().populate({
            path: 'author',
            model: 'Author' // אכלוס פרטי הסופר
        }).exec();
    }

    async getBookById(id: Types.ObjectId): Promise<Book> {
        return this.bookModel.findById(id).populate({
            path: 'author',
            model: 'Author' // אכלוס פרטי הסופר
        }).exec();
    }
    
    async getAuthorByBookId(bookId: Types.ObjectId): Promise<string> {
        const book = await this.bookModel.findById(bookId)
            .populate<{ author: Pick<Author, 'name'> }>('author', 'name') // מביא רק את שם הסופר
            .exec();    
        return book.author.name; // מחזיר את שם הסופר
    }

    async deleteBook(bookId: Types.ObjectId): Promise<Book> {
        // שליפת הספר
        const book = await this.bookModel.findById(bookId).populate('author').exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
    
        // מחיקת הספר מרשימות הספרים שנקראו אצל המשתמשים
        await this.userService.removeBookFromAllUsers(bookId);
    
        // מחיקת הספר מהרשימה של הסופר
        if (book.author) {
            await this.authorService.removeBookFromAuthor(book.author._id, bookId);
        }
    
        // מחיקת הספר מהמאגר
        await this.bookModel.findByIdAndDelete(bookId).exec();
    
        return book;
    }
      
    
}
