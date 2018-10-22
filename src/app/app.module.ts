
import { HttpModule } from '@angular/http';
import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';



import { AppComponent } from './app.component';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserChatComponent } from './containers/user-chat/user-chat.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';



const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


import { ApiService } from './services/api.service';
import { NormalizationService } from './services/normalization.service';
import { ShowStateService } from './services/show-state.service';

import { UsersEffects } from './effects/users';
import { MessagesEffects } from './effects/messages';

import { routes } from './routes';
import { reducer } from './reducers';

import { environment } from './../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarMenuButtonComponent } from './components/navbar-menu-button/navbar-menu-button.component';
import { StartChatButtonComponent } from './components/start-chat-button/start-chat-button.component';
import { SelectedUserComponent } from './containers/selected-user/selected-user.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MessageComponent } from './components/message/message.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { NewMessageFormComponent } from './components/new-message-form/new-message-form.component';



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserChatComponent,
    NavbarComponent,
    UserListItemComponent,
    AvatarComponent,
    ProfileComponent,
    NavbarMenuButtonComponent,
    StartChatButtonComponent,
    SelectedUserComponent,
    SpinnerComponent,
    MessageComponent,
    EllipsisPipe,
    NewMessageFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(UsersEffects),
    EffectsModule.run(MessagesEffects),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ],
  providers: [
    ApiService,
    NormalizationService,
    ShowStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
