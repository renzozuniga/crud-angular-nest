import { Document } from 'mongoose';

export interface Post extends Document {
    title: string;
    url: string;
    author: string;
    objectID: string; 
    createdAt: Date; 
}