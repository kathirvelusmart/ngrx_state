import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { dummyAction } from 'src/app/auth/state/auth.action';
import { Post } from 'src/app/model/posts.model';
import { PostsService } from 'src/app/service/posts.service';
import {
    addPost,
    addPostSuccess,
    deletePost,
    deletePostSuccess,
    loadPosts,
    loadPostsSuccess,
    updatePost,
    updatePostSuccess,
} from './post.action';
import { getPosts } from './post.selector';

@Injectable()
export class PostsEffects {
    constructor(
        private store: Store<AppState>,
        private action$: Actions,
        private postService: PostsService
    ) { }

    loadPosts$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadPosts),
            withLatestFrom(this.store.select(getPosts)),
            mergeMap(([action, posts]) => {
                if (!posts.length || posts.length === 1) {
                    return this.postService.getPosts().pipe(
                        map((posts) => {
                            return loadPostsSuccess({ posts });
                        })
                    );
                }
                return of(dummyAction())
            })
        );
    });

    addPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postService.addPost(action.post).pipe(
                    map((data) => {
                        console.log(data);
                        const post = { ...action.post, id: data.name };
                        return addPostSuccess({ post });
                    })
                );
            })
        );
    });

    updatePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postService.updatePost(action.post).pipe(
                    map((data) => {
                        const updatedPost: Update<Post> | any = {
                            id: action.post.id,
                            changes: { ...action.post },
                        };
                        return updatePostSuccess({ post: updatedPost });
                    })
                );
            })
        );
    });

    deletePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postService
                    .deletePost(action.id)
                    .pipe(map((data) => deletePostSuccess({ id: action.id })));
            })
        );
    });

    getSinglePosts$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r: any) => {
                return r.payload.routerState['params']['id'];
            }),
            withLatestFrom(this.store.select(getPosts)),
            switchMap(([id, posts]) => {
                if (!posts.length) {
                    return this.postService.getPostById(id).pipe(
                        map((post) => {
                            const postData = [{ ...post, id }];
                            return loadPostsSuccess({ posts: postData });
                        })
                    );
                }
                return of(dummyAction());
            })
        );
    });
}
