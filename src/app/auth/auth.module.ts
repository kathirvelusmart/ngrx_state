import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { LoginComponent } from "./login/login.component";
import { AuthEffects } from "./state/auth.effects";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', redirectTo: 'login', pathMatch: 'full'
            },
            {
                path: 'login', component: LoginComponent
            },
            {
                path: 'signup', component: SignupComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        EffectsModule.forFeature([]),
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
    ]
})
export class AuthModule {

}