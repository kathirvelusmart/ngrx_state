import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/model/posts.model";

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post successfully'
export const UPDATE_POST_ACTION = '[posts page] update post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POSTS = '[post page] load posts';
export const LOAD_POSTS_SUCCESS = '[post page] load posts successfully';
export const DELETE_POST_SUCCESS = '[post page] delete posts successfully';

export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());

export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Update<Post> }>());

export const updatePostSuccess = createAction(UPDATE_POST_ACTION, props<{ post: Update<Post> }>());

export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: string }>());

export const loadPosts = createAction(LOAD_POSTS);

export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>());

export const addPostSuccess = createAction(ADD_POST_SUCCESS, props<{ post: Post }>());

export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{ id: string }>());