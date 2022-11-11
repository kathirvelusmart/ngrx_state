import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/model/posts.model';
import { addPost } from '../state/post.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup

  constructor(private store: Store) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }
  get title() {
    return this.postForm.get('title');
  }

  ngOnInit(): void {

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
        errorMessage = 'Description should be minimum 10 characters length.'
      }
    }
    return errorMessage
  }

  addPost() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    }
    this.store.dispatch(addPost({ post }));
  }

}
