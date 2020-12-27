import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreatePostDTO } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(private postService: PostService) {}

    @Get('/init')
    async initialize(@Res() res) {
        const data = await this.postService.initializeData();
        return res.status(HttpStatus.OK).json({
            message: 'init',
            data
        });
    }

    @Get('/data')
    async getData(@Res() res) {
        const data = await this.postService.getData();
        return res.status(HttpStatus.OK).json({
            message: 'data',
            data
        });
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const post = await this.postService.createPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: 'received',
            post
        });
    }

    @Get('/')
    async getPosts(@Res() res) {
        const posts = await this.postService.getPosts();
        return res.status(HttpStatus.OK).json({
            message: 'posts',
            posts
        });
    }

    @Get('/:postID')
    async getPost(@Res() res, @Param('postID') postID) {
        const post = await this.postService.getPost(postID);
        if (!post) throw new NotFoundException('Post does not exists');
        return res.status(HttpStatus.OK).json(post);
    }

    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID') postID) {
        const postDeleted = await this.postService.deletePost(postID);
        if (!postDeleted) throw new NotFoundException('Post does not exists');
        return res.status(HttpStatus.OK).json({
            message: 'Post Delete Successfully',
            postDeleted
        });
    }
}
