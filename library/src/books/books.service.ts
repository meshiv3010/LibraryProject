import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { Book } from './book.schema';
import { CreateBookDto } from './create-book.dto';
import { Author } from '../authors/author.schema'

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(createBookDto);
        return newBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return this.bookModel.find().populate({
            path: 'author',
            model: 'Author' // אכלוס פרטי הסופר
        })
        .exec();
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
        return this.bookModel.findByIdAndDelete(bookId).exec();
    }

    
    
}
