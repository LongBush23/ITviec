import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  address: string;

  @Prop({ type: Object })
  company: {
    _id: string;
    name: string;
  };

  @Prop()
  role: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Object })
  createdBy: {
    _id: string;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: string;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: string;
    email: string;
  };

  // #47 timestamps — tự động set bởi mongoose (timestamps: true)
  createdAt: Date;
  updatedAt: Date;

  // #48 soft-delete — tự động set bởi soft-delete-plugin-mongoose
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
