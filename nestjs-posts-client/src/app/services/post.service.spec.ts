import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { Post } from '../interfaces/Post';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });    
  });

  beforeEach(() => {
    service = TestBed.get(PostService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });

  
  it('should retrieve all posts', () => {
    const dummyPosts: Post[] = [
      { 
        _id: '5fe6985162dc2f3464556883', 
        title: 'Build a Two-Way Pager with Lora', 
        url: 'https://spectrum.ieee.org/geek-life/hands-on/build-a-twoway-pager-with-lora', 
        author: 'giantrobot', 
        objectID: '25538835', 
        createdAt: new Date("2020-12-25T20:33:46.000Z")
      },
      { 
        _id: '5fe6985162dc2f3464556884', 
        title: 'Build a Two-Way Pager with Lora', 
        url: 'https://spectrum.ieee.org/geek-life/hands-on/build-a-twoway-pager-with-lora', 
        author: 'generalizations', 
        objectID: '25538674', 
        createdAt: new Date("2020-12-25T20:09:05.000Z") 
      },
    ];

    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/post`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(dummyPosts);
  });
  
  it('should delete one post', () => {
    const dummyPost: Post = 
      { 
        _id: '5fe6985162dc2f3464556883', 
        title: 'Build a Two-Way Pager with Lora', 
        url: 'https://spectrum.ieee.org/geek-life/hands-on/build-a-twoway-pager-with-lora', 
        author: 'giantrobot', 
        objectID: '25538835', 
        createdAt: new Date("2020-12-25T20:33:46.000Z")
      }

    let id = '5fe6985162dc2f3464556883';
    service.deletePost(id).subscribe(posts => {
      expect(posts).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${service.BASE_URL}/post/delete?postID=${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(dummyPost);
  });

});


