import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Post } from 'src/app/model/posts.model';
import { getPosts } from '../state/post.selector';
import { Observable } from 'rxjs';
import { deletePost, loadPosts } from '../state/post.action';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  post$!: Observable<Post[]>
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.post$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }
  onDeletePost(id: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.store.dispatch(deletePost({ id }));
      this.router.navigate(['/posts']);
    }
  }
}
