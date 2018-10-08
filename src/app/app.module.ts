
import { HttpModule } from '@angular/http';
import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



import { AppComponent } from './app.component';


import { ApiService } from './services/api.service';

import { UsersEffects } from './effects/users';

import { routes } from './routes';
import { reducer } from './reducers';

import { environment } from './../environments/environment';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    EffectsModule.run(UsersEffects)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
