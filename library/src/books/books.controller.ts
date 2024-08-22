import { Controller, Post, Body, Get, Param,NotFoundException } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from '../DTO/create-book.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.createBook(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.getAllBooks();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookService.getBookById(id);
    }

    @Get(':bookId/author')
    getAuthorByBookId(@Param('bookId') bookId: string) {
        return this.bookService.getAuthorByBookId(bookId);
    }
    
}
