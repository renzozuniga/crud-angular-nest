import { Schema } from 'mongoose';

export const PostSchema = new Schema({
    title: { type: String, required: true },
    url: String,
    author: String,
    objectID: String,
    createdAt: { type: Date, default: Date.now }, 
});
