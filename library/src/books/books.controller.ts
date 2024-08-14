import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { bookDTO } from 'src/DTO/book.DTO';

@Controller('books')
export class BooksController 
{
    constructor (private srv : BooksService){}
/*
    @Get()
    getAllBooks()
    {
        return this.srv.getAllBooks();
    }

    @Get()
    getAllAuthors()
    {
        return this.srv.getAllAuthors();
    }

    @Get(':bookNumber')
    getbook(@Param('bookNumber') bookNumber: string) {
        const bookNumberAsNumber = parseInt(bookNumber, 10);
        return this.srv.getBook(bookNumberAsNumber);
    }*/
}

