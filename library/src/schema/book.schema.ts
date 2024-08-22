import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from './author.schema';
import { User } from './user.schema'; 

@Schema({ collection: 'books' })
export class Book extends Document {
    @Prop({ required: true })
    bookNumber: number;

    @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
    author: Types.ObjectId;

    @Prop({ required: true })
    titel: string;

    @Prop([{ type: Types.ObjectId, ref: 'User', required: false  }])
    readers: Types.ObjectId[];

}

export const BookSchema = SchemaFactory.createForClass(Book);
