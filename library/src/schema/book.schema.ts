import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'books' })
export class Book extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
    author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
