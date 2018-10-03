import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';

import { environment } from './../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers';


import { AppComponent } from './app.component';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { ConversationListComponent } from './containers/conversation-list/conversation-list.component';
import { ConversationComponent } from './containers/conversation/conversation.component';


import { NotfoundComponent } from './containers/notfound/notfound.component';
import { AvatarGeneratorComponent } from './components/avatar-generator/avatar-generator.component';


import { ApiService } from './services/api.service';
import { UserListPositionService } from './services/user-list-position.service';

import { ListPositionCenter } from './guards/list-position-center.guard';
import { ListPositionLeft } from './guards/list-position-left.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: 'users',
    component: UserListComponent,
    children: [
      {
        path: ':id',
        canActivate: [ListPositionLeft],
        canDeactivate: [ListPositionCenter],
        component: UserDetailComponent
      }
    ]
  },
  {
    path: 'conversations',
    component: ConversationListComponent,
    children: [
      {
        path: ':id',
        component: ConversationComponent
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    ConversationListComponent,
    ConversationComponent,
    NotfoundComponent,
    AvatarGeneratorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()

  ],
  providers: [
    ApiService,
    UserListPositionService,
    ListPositionCenter,
    ListPositionLeft
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
