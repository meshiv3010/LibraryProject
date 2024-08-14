import { Inject, Injectable} from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
//import { User } from 'src/schema/User.schema';

@Injectable()
export class UsersService{

}




/*import { Injectable } from '@nestjs/common';
import { userDTO } from 'src/DTO/user.DTO';
import { bookDTO } from 'src/DTO/book.DTO';

@Injectable()
export class UsersService {
    private users: userDTO[] = [];
    private userBooksMap: Map<number, bookDTO[]> = new Map();

    // פונקציה להוספת משתמש חדש
    addUser(user: userDTO): string {
        this.users.push(user);
        this.userBooksMap.set(user.userNumber, []);
        return 'User added';
    }

    // פונקציה לקבלת משתמש לפי מזהה
    getUserByUserNumber(userNumber: number): userDTO | undefined {
        return this.users.find(user => user.userNumber === userNumber);
    }

    //מחזירה את כל המשתמשים עם המספר מזהה
    getAllUsers(): { userNumber: number; name: string }[] 
    {
        return this.users.map(user => ({ userNumber: user.userNumber, name: user.name }));
    }


    // פונקציה להוספת ספר למשתמש
    addBookToUser(userNumber: number, book: bookDTO): string {
        const books = this.userBooksMap.get(userNumber);//קבלת רשימת הספרים של המשתמש
        if (!books) {
            return 'User not found';
        }
        books.push(book);
        this.userBooksMap.set(userNumber, books);
        return 'Book added to user';
    }

    // פונקציה לקבלת ספרים של משתמש
    getBooksByUser(userNumber: number): bookDTO[] | undefined {
        return this.userBooksMap.get(userNumber);
    }
}*/