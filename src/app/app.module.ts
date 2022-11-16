import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { appReducer } from './app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthTokenInterceptor } from './service/authToken.interceptor';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './router/custom.serializer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // links reducers here
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      //Resrict the logOnly in production mode
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
