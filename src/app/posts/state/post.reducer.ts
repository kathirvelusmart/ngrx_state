import { createReducer, on } from '@ngrx/store';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './post.action';
import { initialState, postsAdapter } from './post.state';

const _postReducer = createReducer(
  initialState,
  // on(addPostSuccess, (state, action) => {
  //     let post = { ...action.post };
  //     return {
  //         ...state,
  //         posts: [...state.posts, post],
  //     }
  // }),
  // on(updatePostSuccess, (state, action) => {
  //     const updatedPosts = state.posts.map((post) => {
  //         return post.id === action.post.id ? action.post : post;
  //     })
  //     return {
  //         ...state,
  //         posts: updatedPosts,
  //     }
  // }),
  // on(deletePostSuccess, (state, { id }) => {
  //     const updatedPost = state.posts.filter((post: any) => post.id !== id);
  //     return {
  //         ...state,
  //         posts: updatedPost
  //     }
  // }),
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { id }) => {
    return postsAdapter.removeOne(id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  })
);

export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
