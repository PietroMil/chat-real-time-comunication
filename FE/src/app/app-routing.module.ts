import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ConversationsPageComponent } from './pages/conversations-page/conversations-page.component';
import { UserGuard } from './guards/user.guard';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'conversations', component: ConversationsPageComponent, canActivate: [UserGuard]},
  { path: 'chat/:conversationId', component: ChatPageComponent, canActivate: [UserGuard] },
  { path: 'contacts', component: ContactsPageComponent, canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
