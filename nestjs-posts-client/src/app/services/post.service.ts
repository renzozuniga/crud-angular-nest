import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post } from '../interfaces/Post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  BASE_URL: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/post`);
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.BASE_URL}/post/delete?postID=${id}`);
  }
}
