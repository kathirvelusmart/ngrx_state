import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/router/custom.serializer';
import { getCurrentRoute } from 'src/app/router/router.selector';
import { postsAdapter, PostsState } from './post.state';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

export const getPostEntities = createSelector(getPostsState, postsSelectors.selectEntities);

export const getPostById = createSelector(
    getPostEntities,
    getCurrentRoute,
    (posts: any, route: RouterStateUrl) => {
        return posts ? posts[route.params['id']] : null;
    }
);
