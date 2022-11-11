import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Post } from 'src/app/model/posts.model';
import { getPosts } from '../state/post.selector';
import { Observable } from 'rxjs';
import { deletePost } from '../state/post.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  post$!: Observable<Post[]>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.post$ = this.store.select(getPosts)
  }
  onDeletePost(id: any) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.store.dispatch(deletePost({ id }))
    }
  }
}
