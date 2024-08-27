import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { Book } from '../schema/book.schema';
import { CreateBookDto } from '../DTO/create-book.dto';
import { Author } from 'src/schema/author.schema';
import path from 'path';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(createBookDto);
        return newBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return this.bookModel.find().populate({
            path: 'readers',
            model: 'User' // אכלוס פרטי הקוראים
        }).populate({
            path: 'author',
            model: 'Author' // אכלוס פרטי הסופר
        })
        .exec();
    }

    async getBookById(id: string): Promise<Book> {
        return this.bookModel.findById(id).populate({
            path: 'readers',
            model: 'User' // אכלוס פרטי הקוראים
        }).populate({
            path: 'author',
            model: 'Author' // אכלוס פרטי הסופר
        }).exec();
        
    }
    
    async getAuthorByBookId(bookId: string): Promise<string> {
        const book = await this.bookModel.findById(bookId)
            .populate<{ author: Pick<Author, 'name'> }>('author', 'name') // מביא רק את שם הסופר
            .exec();    
        return book.author.name; // מחזיר את שם הסופר
    }

    async removeReaderFromBook(bookId: Types.ObjectId, userId: Types.ObjectId): Promise<Book> {
        // עדכון הרשימה של ה-readers ע"י הסרת ה-userId
        return this.bookModel.findByIdAndUpdate(
            bookId,
            { $pull: { readers: userId } }, // ה-$pull מסיר את ה-userId מהמערך
            { new: true } // החזרת המסמך המעודכן
        ).exec();
    }
    
    
    
}
