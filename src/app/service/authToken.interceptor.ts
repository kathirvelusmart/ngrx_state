import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, Observable, take } from "rxjs";
import { getAuthToken } from "../auth/state/auth.selector";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getAuthToken).pipe(
            take(1),
            exhaustMap((token) => {
                if (!token) {
                    return next.handle(req);
                }
                let modifiedReq = req.clone({
                    params: req.params.append('auth', token)
                });
                return next.handle(modifiedReq)
            })
        )
    }
}