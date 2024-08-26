import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from './book.schema';
import * as mongoose from 'mongoose';

@Schema({ collection: 'authors' })
export class Author extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    writerNumber: number;    
    
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }])
    books: Book[];
    //books: mongoose.Types.ObjectId[];

}

export const AuthorSchema = SchemaFactory.createForClass(Author);
