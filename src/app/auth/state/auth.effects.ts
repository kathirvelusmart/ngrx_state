import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/shared-state/shared.action";
import { loginStart, loginSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions,
        private authService: AuthService,
        private store: Store,
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
                        return loginSuccess({ user });
                    }),
                    catchError((errorResponse) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(errorResponse.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            }))
    })
}