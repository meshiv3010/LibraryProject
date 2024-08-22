import { IsNotEmpty, IsString, IsMongoId, IsNumber } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNumber()
    bookNumber:number;

    @IsMongoId()
    author: string;
}
