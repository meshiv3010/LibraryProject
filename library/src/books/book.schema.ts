import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ collection: 'books' })
export class Book extends Document {
  @Prop({ required: true })
  bookNumber: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  author: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
