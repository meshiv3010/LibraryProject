import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './authors.service';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    findAll() {
        return this.authorService.getAllAuthors();
    }

    @Get(':id/books')
    findBooksByAuthor(@Param('id') id: string) {
        return this.authorService.getBooksByAuthor(id);
    }
}
