import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author } from '../schema/author.schema';
import { Book } from '../schema/book.schema';
import path from 'path';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

    async getAllAuthors(): Promise<Author[]> {
    return this.authorModel.find()
        .populate({
            path: 'books',
            populate: {
                path: 'readers',
                model: 'User' // אכלוס פרטי הקוראים
            }
        })
        .exec();
}


    async getBooksByAuthor(authorId: Types.ObjectId): Promise<Book[]> {
        const author = await this.authorModel.findById(authorId)
            .populate({
                path: 'books',
                populate: {
                    path: 'readers',
                    model: 'User' // אכלוס פרטי הקוראים
                }
            })
            .exec();
    
        return author.books;
    }


    async getAllAuthorsNameWithNumber(): Promise<{ name: string; writerNumber: number }[]> {
        return this.authorModel.find({}, { name: 1, writerNumber: 1 }).exec();
    }
}
