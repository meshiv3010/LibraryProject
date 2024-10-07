import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema()
export class Book extends Document {
    @Prop({ required: true })
    bookNumber: number;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Author' })
    author: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // שדה לקוראים
    readers: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
