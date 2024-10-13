import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'; // ייבוא Inject ו-forwardRef
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from './book.schema';
import { Author } from '../authors/author.schema'; 
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/UpdateBookDto';
import { AuthorService } from '../authors/authors.service';
import { UserService } from '../users/users.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService, // שימוש ב-forwardRef
    @Inject(forwardRef(() => AuthorService)) private readonly authorService: AuthorService
) {}


    async updateBook(bookId: Types.ObjectId, updateBookDto: UpdateBookDto): Promise<Book> {
        // עדכון הספר לפי ה-id וה-DTO
        const updatedBook = await this.bookModel.findByIdAndUpdate(bookId, updateBookDto, { new: true }).exec();
        if (!updatedBook) {
            throw new NotFoundException('Book not found');
        }
        return updatedBook;
    }
    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(createBookDto);
        return newBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        // חיפוש ספרים עם populate על readers
        const books = await this.bookModel.find()
            .populate({
                path: 'readers',  // אכלוס של הקוראים
                model: 'User',     // דגם של המשתמשים
                select: 'userNumber name readBooks favBook'  // פרטים שנרצה לאכלס עבור המשתמשים
            })
            .populate({
                path: 'author',   // אכלוס פרטי הסופר
                model: 'Author',  // דגם של הסופרים
                select: 'writerNumber name'  // פרטים שנרצה לאכלס עבור הסופרים
            })
            .exec();
        
        return books;
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
