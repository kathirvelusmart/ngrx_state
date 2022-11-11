import { createReducer, on } from "@ngrx/store"
import { addPost, deletePost, updatePost } from "./post.action"
import { initialState } from "./post.state"

const _postReducer = createReducer(
    initialState,
    on(addPost, (state, action) => {
        console.log({ state }, { action })
        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();//String only returns
        return {
            ...state,
            posts: [...state.posts, post],
        }
    }),
    on(updatePost, (state, action) => {
        const updatedPosts = state.posts.map((post) => {
            return post.id === action.post.id ? action.post : post;
        })
        return {
            ...state,
            posts: updatedPosts,
        }
    }),
    on(deletePost, (state, { id }) => {
        const updatedPost = state.posts.filter((post: any) => post.id !== id);
        return {
            ...state,
            posts: updatedPost
        }
    }),
)

export function postReducer(state: any, action: any) {
    return _postReducer(state, action)
}