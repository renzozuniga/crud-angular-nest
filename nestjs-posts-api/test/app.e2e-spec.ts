import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PostService } from '../../nestjs-posts-client/src/app/services/post.service';
import { rootMongooseTestModule } from '../src/test-utils/mongo/MongooseTestModule';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let postService: { 
    getPosts: () => [],
    createPost: () => [],
    deletePost: () => []
  }
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        AppModule
      ],
    })
      .overrideProvider(PostService)
      .useValue(postService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET post)', () => {
    return request(app.getHttpServer())
      .get('/post')
      .expect(200)
      .expect({
        data: postService.getPosts(),
        hello: 'Hello World!'
      });
  });

  it('/ (POST post)', () => {
    return request(app.getHttpServer())
      .get('/post')
      .expect(200)
      .expect({
        data: postService.createPost(),
        hello: 'Hello World!'
      });
  });

  it('/ (DELETE post)', () => {
    return request(app.getHttpServer())
      .get('/post')
      .expect(200)
      .expect({
        data: postService.deletePost(),
        hello: 'Hello World!'
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
