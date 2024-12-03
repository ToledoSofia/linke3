import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import { MusicoProfileComponent } from './musico-profile/musico-profile.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    SignupComponent,
    MusicoProfileComponent,
    ConfirmDialogComponent,
    EditProfileComponent,
    ImageCropperDialogComponent,
    PublicacionComponent,
    UserCardsComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSelectModule, 
    MatOptionModule  
  ],
  providers: [    
    provideHttpClient(withFetch()), provideAnimationsAsync() 
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
