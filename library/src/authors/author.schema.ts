import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Book } from '../books/book.schema';
import * as mongoose from 'mongoose';

@Schema({ collection: 'authors' })
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  authorNumber: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }])
  books: mongoose.Types.ObjectId[]; // צריך לשמש כ-ID של ספרים
}


export const AuthorSchema = SchemaFactory.createForClass(Author);
