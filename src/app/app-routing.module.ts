import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { AuthGuardClass } from './service/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then((module) => module.CounterModule)
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/post.module').then((module) => module.PostModule),
    canActivate: [AuthGuardClass]
  },
  {
    path: 'posts/details/:id',
    component: SinglePostComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
