import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schema/book.schema';
import { CreateBookDto } from '../DTO/create-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(createBookDto);
        return newBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async getBookById(id: string): Promise<Book> {
        return this.bookModel.findById(id).exec();
    }
}
