import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './interfaces/post.interface';
import { HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../test-utils/mongo/MongooseTestModule';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
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
    controller = module.get<PostController>(PostController);
  });

  describe('getPosts', () => {
    it('should return an array of posts', async () => {
      let post: Post;
      const result = [post];
      jest.spyOn(service, 'getPosts').mockImplementation(async () => await result);

      expect(await service.getPosts()).toBe(result);
    });
  });
});
