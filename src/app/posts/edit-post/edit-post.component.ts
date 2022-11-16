import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { updatePost } from '../state/post.action';
import { getPostById } from '../state/post.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post!: Post;
  postSubscription!: Subscription;
  postForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.postSubscription = this.store.select(getPostById, { id }).subscribe((data) => {
    //     this.post = data;
    //     this.createForm();
    //   })
    // })
    this.createForm();
    this.store.select(getPostById).subscribe((post) => {
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          title: post.title,
          description: post.description,
        });
      }
    });
  }
  get title() {
    return this.postForm.get('title');
  }
  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post?.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  editPost() {
    if (!this.postForm.valid) {
      return;
    }
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Update<Post> | any = {
      id: this.post.id,
      title,
      description,
    };
    //Dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['/posts']);
  }
  // Validations through method
  showDescriptionErrors() {
    const description = this.postForm.get('description');
    let errorMessage;
    if (description?.invalid && (description.dirty || description?.touched)) {
      if (description?.errors?.['required']) {
        errorMessage = 'Description is required';
      }
      if (description?.errors?.['minlength']) {
        errorMessage = 'Description should be minimum 10 characters length.';
      }
    }
    return errorMessage;
  }
  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
