import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'; 
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
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService, 
    @Inject(forwardRef(() => AuthorService)) private readonly authorService: AuthorService
) {}


    async updateBook(bookId: Types.ObjectId, updateBookDto: UpdateBookDto): Promise<Book> {
        // Update the book by id and DTO
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

    async addReaderToBook(bookId: Types.ObjectId, userId: Types.ObjectId): Promise<Book> {
        // Update the book to add the user to the reader list
        const book = await this.bookModel.findByIdAndUpdate(
            bookId,
            { $addToSet: { readers: userId } }, // Adding the user to readers if it does not exist
            { new: true } //Returning the updated book
        ).exec();
    
        if (!book) {
            throw new NotFoundException('Book not found'); // If no book is found
        }
    
        return book;
    }
    
    async getAllBooks(): Promise<Book[]> {
        // Search for books with populate on readers
        const books = await this.bookModel.find()
            .populate({
                path: 'readers',  // Location of readers
                model: 'User',     // User model
                select: 'userNumber name readBooks favBook'  //Details we would like to populate for users
            })
            .populate({
                path: 'author',   // Populating the writer's details
                model: 'Author',  // A model of author
                select: 'writerNumber name'  //Details we would like to populate for the authors
            })
            .exec();
            
        return books;
    }
    
    async getBookById(id: Types.ObjectId): Promise<Book> {
        return this.bookModel.findById(id).populate({
            path: 'author',
            model: 'Author' // Populating the author's details
        }).exec();
    }
    
    async getAuthorByBookId(bookId: Types.ObjectId): Promise<string> {
        const book = await this.bookModel.findById(bookId)
            .populate<{ author: Pick<Author, 'name'> }>('author', 'name') //Only gives the author's name
            .exec();    
        return book.author.name; //Returns the author's name.
    }

    async removeReaderFromBook(bookId: Types.ObjectId, userId: Types.ObjectId): Promise<Book> {
        const book = await this.bookModel.findByIdAndUpdate(
            bookId,
            { $pull: { readers: userId } }, //Removing the user from the list
            { new: true } // Returning the updated book
        ).exec();
    
        if (!book) {
            throw new NotFoundException('Book not found');
        }
    
        return book;
    }
    
    async deleteBook(bookId: Types.ObjectId): Promise<Book> {
        // Retrieving the book
        const book = await this.bookModel.findById(bookId).populate('author').exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
    
        // Delete the book from the users' read books lists
        await this.userService.removeBookFromAllUsers(bookId);
    
        // Deleting the book from the author's list
        if (book.author) {
            await this.authorService.removeBookFromAuthor(book.author._id, bookId);
        }
    
        // Deleting the book from the DB
        await this.bookModel.findByIdAndDelete(bookId).exec();
    
        return book;
    }
      
    
    
}
