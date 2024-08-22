import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from './book.schema';

@Schema({ collection: 'authors' })
export class Author extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    writerNumber: number;    
    
    @Prop([{ type: Types.ObjectId, ref: 'Book' }])
    books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
