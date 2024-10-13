import { Controller, Post, Body, Get, Delete, Param, NotFoundException, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/UpdateBookDto'; // ייבוא UpdateBookDto
import { Types } from 'mongoose';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true })) // אימות בעזרת ValidationPipe
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.createBook(createBookDto);
    }

    @Put(':id') // קריאת PUT לעדכון ספר לפי מזהה
    @UsePipes(new ValidationPipe({ whitelist: true }))
    updateBook(@Param('id') id: Types.ObjectId, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.updateBook(id, updateBookDto);
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

    @Delete(':id')
    async deleteBook(@Param('id') id: Types.ObjectId) {
        return this.bookService.deleteBook(id);
    }
}
