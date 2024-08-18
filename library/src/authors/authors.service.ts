import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from '../schema/author.schema';
import { Book } from '../schema/book.schema';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

    async getAllAuthors(): Promise<Author[]> {
        return this.authorModel.find().populate('books').exec();
    }

    async getBooksByAuthor(authorId: string): Promise<Book[]> {
        const author = await this.authorModel.findById(authorId).populate('books').exec();
        return author ? author.books : [];
    }
}
