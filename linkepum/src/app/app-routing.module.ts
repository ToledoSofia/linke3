import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MusicoProfileComponent } from './musico-profile/musico-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FeedComponent } from './feed/feed.component';
import { CreateGroupComponent } from './create-group/create-group.component'; 
import { UserCardsComponent } from './user-cards/user-cards.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'update', component: EditProfileComponent },
  { path: 'musico-profile', component: MusicoProfileComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'create-group', component: CreateGroupComponent }, 
  { path: 'usuarios', component: UserCardsComponent }, 
  { path: 'perfil/:id', component: UserProfileComponent }, 



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
