import { Injectable } from '@nestjs/common';
import { bookDTO } from 'src/DTO/book.DTO';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
    private books: bookDTO[] = [];

    constructor(private readonly usersService: UsersService) {
        this.initializeBooks();
    }

    private initializeBooks() {
        let book0: bookDTO = new bookDTO();
        book0.bookNumber = 0;
        book0.name = 'לא רציונלי ולא במקרה';
        book0.authorNumber = 0;
        book0.author = 'פרופ\' דן אריאלי';

        let book1: bookDTO = new bookDTO();
        book1.bookNumber = 1;
        book1.name = 'קיצור תולדות האנושות';
        book1.authorNumber = 1;
        book1.author = 'פרופ\' יובל נח הררי';

        let book2: bookDTO = new bookDTO();
        book2.bookNumber = 2;
        book2.name = 'הארי פוטר';
        book2.authorNumber = 2;
        book2.author = 'ג.ק.רולינג';

        this.books.push(book0, book1, book2);
    }
/*
    //החזרת מערך של כל הספרים
    getAllBooks(): bookDTO[] {
        return this.books;
    }

      //החזרת פרטי ספר
    getBook(bookNumber: number): bookDTO | undefined {
        return this.books.find(x => x.bookNumber === bookNumber);
    }  

    // החזרת מערך של כל הסופרים
    getAllAuthors(): { authorNumber: number; author: string }[] {
        const authorsMap = new Map<number, string>();
        this.books.forEach(book => {
            authorsMap.set(book.authorNumber, book.author);
        });
        return Array.from(authorsMap.entries()).map(([authorNumber, author]) => ({ authorNumber, author }));
    }
    //החזרת שם ומזהה ספר של סופר
    getBooksDetailsByAuthor(authorName: string): { bookNumber: number; name: string }[] {
        return this.books
            .filter(book => book.author === authorName)
            .map(book => ({ bookNumber: book.bookNumber, name: book.name }));
    }

  /*  addBook(book: bookDTO): string {
        this.books.push(book);
        return 'Created';
    }
*
    // פונקציה להוספת ספר למשתמש
    addBookToUser(userNumber: number, bookNumber: number): string {
        const book = this.getBook(bookNumber);
        if (!book) {
            return 'Book not found';
        }
        return this.usersService.addBookToUser(userNumber, book);
    }*/
}