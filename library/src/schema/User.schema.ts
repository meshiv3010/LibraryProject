import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from './book.schema';

@Schema({ collection: 'users' })
export class User extends Document {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    userNumber: number;

     @Prop({ type: Types.ObjectId, ref: 'Book', required: false })
    favBook: Types.ObjectId; 

    @Prop([{ type: Types.ObjectId, ref: 'Book' }])
    readBooks: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
