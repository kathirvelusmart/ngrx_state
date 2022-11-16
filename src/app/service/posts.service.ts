import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../model/posts.model';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`https://vue-completecourse.firebaseio.com/posts.json`).pipe(
            map((data: any) => {
                const posts: Post[] = []
                for (let key in data) {
                    posts.push({ ...data[key], id: key })
                }
                return posts;
            })
        )
    }

    addPost(post: Post): Observable<{ name: string }> {
        return this.http.post<{ name: string }>(`https://vue-completecourse.firebaseio.com/posts.json`, post)
    }

    updatePost(post: any) {
        let postId: any = post.id
        const postData = { [postId]: { title: post.title, description: post.description } };
        return this.http.patch(`https://vue-completecourse.firebaseio.com/posts.json`, postData);
    }

    deletePost(postId: string) {
        return this.http.delete(`https://vue-completecourse.firebaseio.com/posts/${postId}.json`)
    }

    getPostById(postId: string): Observable<Post> {
        return this.http.get<Post>(`https://vue-completecourse.firebaseio.com/posts/${postId}.json`)
    }
}