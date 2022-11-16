import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/shared-state/shared.action";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) { }

    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({ user, redirect: true });
                    }),
                    catchError((errorResponse) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(errorResponse.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            }))
    })

    loginRedirect$ = createEffect(() => {
        return this.action$.pipe(
            ofType(...[loginSuccess, signupSuccess]),
            tap((action) => {
                this.store.dispatch(setErrorMessage({ message: '' }))
                if (action.redirect) {
                    return this.router.navigate(['/'])
                }
                return null;
            })
        )
    }, { dispatch: false }) // when dispatch false, it will not return anything

    signUp$ = createEffect(() => {
        return this.action$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService.signup(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signupSuccess({ user, redirect: true })
                    }),
                    catchError((errorResponse) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(errorResponse.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }))
                    })
                )
            })
        )
    })

    autoLogin$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStorage();
                console.log(user)
                return of(loginSuccess({ user, redirect: false }))
            })
        )
    })

    autoLogout$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLogout),
            map((action) => {
                this.authService.logout();
                this.router.navigate(['auth']);
            })
        )
    }, { dispatch: false })
}