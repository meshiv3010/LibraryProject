import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';
import * as mongoose from 'mongoose';
import { Book } from './book.schema';

@Schema({ collection: 'users' })
export class User extends Document {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    userNumber: number;

     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false })
    favBook: mongoose.Types.ObjectId; 

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }])
    readBooks: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
