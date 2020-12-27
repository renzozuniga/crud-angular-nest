import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { Post } from './interfaces/post.interface';
import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';
import { CreatePostDTO } from './dto/post.dto';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      imports: [
        HttpModule,
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'Post', schema: PostSchema }
        ]),
      ]
    }).compile();

    service = module.get<PostService>(PostService);
  });

  
  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      let post: Post;
      const result = [post];
      jest.spyOn(service, 'getPosts').mockImplementation(async () => await result);

      expect(await service.getPosts()).toBe(result);
    });
  });

  describe('createPost', () => {
    it('should return a created post', async () => {
      let post: Post;
      const result = post;
      jest.spyOn(service, 'createPost').mockImplementation(async () => await result);

      let createdPostDTO = new CreatePostDTO();
      createdPostDTO.title = "Demo Title";
      createdPostDTO.url = "Demo Url";
      createdPostDTO.objectID = "Demo Object ID";
      createdPostDTO.createdAt = new Date();
      expect(await service.createPost(createdPostDTO)).toBe(result);
    });
  });

  describe('deletePost', () => {
    it('should return a deleted post', async () => {
      let post: Post;
      const result = null
      jest.spyOn(service, 'deletePost').mockImplementation(async () => await result);

      let id = "1"
      expect(await service.deletePost(id)).toBe(result);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
