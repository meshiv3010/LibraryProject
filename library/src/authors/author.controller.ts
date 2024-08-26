import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { Types } from 'mongoose';
import { Book } from 'src/schema/book.schema';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    findAll() {
        return this.authorService.getAllAuthors();
    }

    @Get(':id/books')
    findBooksByAuthor(@Param('id') id: string): Promise<Book[]> {
        // המרה של ה-ID ל-ObjectId של MongoDB
        const objectId = new Types.ObjectId(id);
        return this.authorService.getBooksByAuthor(objectId);
    }
    
    @Get('nameAndNumner')
    getAllAuthorsNameWithNumber() {
        return this.authorService.getAllAuthorsNameWithNumber();
    }
}
