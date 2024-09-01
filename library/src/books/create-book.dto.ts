import { IsNotEmpty, IsString, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNumber()
    bookNumber:number;

    @IsMongoId()
    author: Types.ObjectId;
}
