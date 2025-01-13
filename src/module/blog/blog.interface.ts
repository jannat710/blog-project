import { Schema } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
