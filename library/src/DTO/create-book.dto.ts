import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsMongoId()
    author: string; // מזהה של הסופר
}
