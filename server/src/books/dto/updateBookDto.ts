import { IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateBookDto {
    @IsOptional() // שדה לא חובה
    @IsString()
    title?: string;

    @IsOptional() // שדה לא חובה
    @IsNumber()
    bookNumber?: number;

    @IsOptional() // שדה לא חובה
    @IsMongoId()
    author?: Types.ObjectId;
}
