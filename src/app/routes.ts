import { Routes } from '@angular/router';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserChatComponent } from './containers/user-chat/user-chat.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserListComponent,
    children: [
      {
        path: ':id',
        component: UserDetailComponent,
        children: [
          {
            path: 'conversation',
            component: UserChatComponent,
          }
        ]
      }
    ]
  }
];
