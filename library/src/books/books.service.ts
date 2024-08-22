import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,PopulatedDoc } from 'mongoose';
import { Book } from '../schema/book.schema';
import { CreateBookDto } from '../DTO/create-book.dto';
import { Author } from 'src/schema/author.schema';

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


    async getAuthorByBookId(bookId: string): Promise<string> {
        const book = await this.bookModel.findById(bookId)
            .populate<{ author: Pick<Author, 'name'> }>('author', 'name') // מביא רק את שם הסופר
            .exec();
    
        if (!book || !book.author) {
            throw new NotFoundException('Author not found for the given book');
        }
    
        return book.author.name; // מחזיר את שם הסופר
    }
    
    
}
