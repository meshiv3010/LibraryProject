import { IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional() 
    @IsNumber()
    bookNumber?: number;

    @IsOptional() 
    @IsMongoId()
    author?: Types.ObjectId;
}
