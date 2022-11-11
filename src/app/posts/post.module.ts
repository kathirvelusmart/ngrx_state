import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostListComponent } from "./post-list/post-list.component";
import { postReducer } from "./state/post.reducer";

const routes: Routes = [
    {
        path: '', component: PostListComponent,
        children: [
            {
                path: 'addPost', component: AddPostComponent
            },
            {
                path: 'edit/:id', component: EditPostComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('posts', postReducer),
    ],
    declarations: [
        PostListComponent,
        AddPostComponent,
        EditPostComponent
    ]
})
export class PostModule {

}