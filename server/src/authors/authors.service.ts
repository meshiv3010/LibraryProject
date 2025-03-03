import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Author } from './author.schema';
import { BookService } from '../books/books.service';
import { UserService } from '../users/users.service';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @Inject(forwardRef(() => BookService)) private readonly bookService: BookService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService // Inject UserService with forwardRef
  ) {}


  async getAllAuthors(): Promise<Author[]> {
    return this.authorModel
      .find()
      .populate({
        path: 'books',
        populate: {
          path: 'readers', // Reader location
          model: 'User',    // User model
          select: 'userNumber name readBooks favBook' // Details we would like to populate for users
        }
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

    // Delete each book by the author from the DB and from the users' records
    for (const bookId of author.books) {
        await this.bookService.deleteBook(bookId);  // Deleting the book
        await this.userService.removeBookFromAllUsers(bookId); // Remove the book from all users
    }

    // Deleting the author after deleting the books
    await this.authorModel.findByIdAndDelete(authorId).exec();
    console.log(`Deleted author ${authorId} and all their books.`);
  }
async removeBookFromAuthor(authorId: Types.ObjectId, bookId: Types.ObjectId): Promise<void> {
  await this.authorModel.findByIdAndUpdate(
    authorId,
    { $pull: { books: { $eq: bookId } } }, 
    { new: true }
  ).exec();
  console.log(`Book ${bookId} has been removed from author's books.`);
}

async updateAuthor(authorId: Types.ObjectId, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
  const updatedAuthor = await this.authorModel.findByIdAndUpdate(
    authorId,
    { $set: updateAuthorDto },
    { new: true }  // Returns the updated object
  ).exec();

  if (!updatedAuthor) {
    throw new NotFoundException('Author not found');
  }

  return updatedAuthor;
}

}
