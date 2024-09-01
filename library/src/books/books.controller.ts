import { Controller, Post, Body, Get,Put, Param,NotFoundException } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './create-book.dto';
import { Types } from 'mongoose';
import { Validate } from 'class-validator';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    @Validate(CreateBookDto)
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.createBook(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.getAllBooks();
    }

    @Get(':id')
    findOne(@Param('id') id: Types.ObjectId) {
        return this.bookService.getBookById(id);
    }

    @Get(':bookId/author')
    getAuthorByBookId(@Param('bookId') bookId: Types.ObjectId) {
        return this.bookService.getAuthorByBookId(bookId);
    }
    
}
