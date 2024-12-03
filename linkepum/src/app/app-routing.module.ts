import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MusicoProfileComponent } from './musico-profile/musico-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FeedComponent } from './feed/feed.component';
import { CreateGroupComponent } from './create-group/create-group.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'update', component: EditProfileComponent },
  { path: 'musico-profile', component: MusicoProfileComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'create-group', component: CreateGroupComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
