import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from './author.schema';
import { User } from './user.schema'; 
import * as mongoose from 'mongoose';

@Schema({ collection: 'books' })
export class Book extends Document {
    @Prop({ required: true })
    bookNumber: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
    author: mongoose.Types.ObjectId;

    @Prop({ required: true })
    titel: string;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false  }])
    readers: mongoose.Types.ObjectId[];

}

export const BookSchema = SchemaFactory.createForClass(Book);
