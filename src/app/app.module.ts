import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { ConversationListComponent } from './containers/conversation-list/conversation-list.component';


import { ApiService } from './services/api.service';

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
        component: UserDetailComponent
      }
    ]
  },
  {
    path: 'conversations',
    component: ConversationListComponent,
    children: [
      // {
      //   path: ':id',
      //   component:
      // }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    ConversationListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
