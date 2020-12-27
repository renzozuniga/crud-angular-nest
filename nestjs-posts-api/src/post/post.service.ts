import { HttpService, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/post.dto';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class PostService {

    constructor(
        private http: HttpService,
        @InjectModel('Post') private readonly postModel: Model<Post>) {}

    async initializeData() {
        // const del = await this.postModel.deleteMany();
        const res =  await this.http.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();
        const hits = res.data.hits;
        hits.forEach( async (hit) => {
            let element = new CreatePostDTO();
            element.title = hit.story_title ? hit.story_title : hit.title;
            element.url = hit.story_url ? hit.story_url : hit.url;
            element.author = hit.author;
            element.objectID = hit.objectID;
            element.createdAt = hit.created_at;    
            await this.createPost(element); 
        });

        return res.data;
    }

    @Interval(3600000)  
    async getData() {
        const res =  await this.http.get('http://hn.algolia.com/api/v1/search_by_date?query=nodejs').toPromise();
        const hits = res.data.hits.filter((hit: any) => {
            const now = new Date();
            return (new Date(hit.created_at)).getTime() >= 
                   (new Date(now.getTime() - (1000*60*60)).getTime()) &&
                   (new Date(hit.created_at)).getTime() <= now.getTime();
        });
        hits.forEach( async (hit) => {
            let element = new CreatePostDTO();
            element.title = hit.story_title ? hit.story_title : hit.title;
            element.url = hit.story_url ? hit.story_url : hit.url;
            element.author = hit.author;
            element.objectID = hit.objectID;
            element.createdAt = hit.created_at;    
            await this.createPost(element); 
        });
        return res.data;
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find()
        return posts;
    }

    async getPost(postID: string): Promise<Post> {
        const post = await this.postModel.findById(postID);
        return post;
    }

    async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const post = new this.postModel(createPostDTO);  
        return await post.save()
    }

    async deletePost(postID: string): Promise<Post> {
        const deletedPost = await this.postModel.findByIdAndDelete(postID);
        return deletedPost;
    }
}
