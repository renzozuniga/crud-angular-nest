import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  goToExternalURL(url: string) {
    if (url) 
      window.open(url, "_blank");
    else 
      alert("There is no URL!");
  }

  getPosts() {
    this.postService.getPosts()
      .subscribe(
        (res: any) => {
          this.posts = res.posts;
          this.posts.sort(function(a,b) {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });
        },
        err => console.log(err)
      )
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(
        res => {
          this.getPosts();
        },
        err => console.log(err)
      )
  }
}
