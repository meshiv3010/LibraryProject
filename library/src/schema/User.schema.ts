import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";

@Schema({collection: 'users'})
export class User
{
    @Prop({unique:true,required:true})
    name:string;

    @Prop({required:false})
    userNumber:string;

    @Prop({required:false})
    displayName?: string;

    @Prop({required:false})
    avatarUrl?:string;

}


export const UserSchema = SchemaFactory.createForClass(User);