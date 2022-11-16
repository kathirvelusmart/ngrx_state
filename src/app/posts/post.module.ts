import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsEffects } from './state/post.effects';
import { postReducer } from './state/post.reducer';
import { SinglePostComponent } from './single-post/single-post.component';

const routes: Routes = [
    {
        path: '',
        component: PostListComponent,
        children: [
            {
                path: 'addPost',
                component: AddPostComponent,
            },
            {
                path: 'edit/:id',
                component: EditPostComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('posts', postReducer),
        EffectsModule.forFeature([PostsEffects]),
    ],
    declarations: [
        PostListComponent,
        AddPostComponent,
        EditPostComponent,
        SinglePostComponent,
    ],
})
export class PostModule { }
