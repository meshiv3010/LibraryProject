import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Author } from './author.schema'
import { Book } from '../books/book.schema';
import { BookService } from 'src/books/books.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly bookService: BookService,
    private readonly userService: UserService
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return this.authorModel
      .find()
      .populate({
        path: 'books',
      })
      .exec();
  }

  async getBooksByAuthor(authorId: Types.ObjectId): Promise<Types.ObjectId[]> {
    const author = await this.authorModel
      .findById(authorId)
      .populate({
        path: 'books',
      })
      .exec();

      return author.books
  }

  async getAllAuthorsNameWithNumber(): Promise<{ name: string; authorNumber: number }[] > {
    return this.authorModel.find({}, { name: 1, writerNumber: 1 }).exec();
  }

  async deleteAuthor(authorId: Types.ObjectId): Promise<void> {
    const author = await this.authorModel.findById(authorId).exec();
    if (!author) {
        throw new NotFoundException('Author not found');
    }
    for (const bookId of author.books) {
        await this.bookService.deleteBook(bookId);
        await this.userService.removeBookFromAllUsers(bookId);
    }
    await this.authorModel.findByIdAndDelete(authorId).exec();
    console.log(`Deleted author ${authorId}.`);
}
}
