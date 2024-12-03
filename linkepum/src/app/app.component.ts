import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './services/api.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'linkepum';
  message : string = "";

  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {}
  
  navigateToLogin() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); 
    }else{
      this.router.navigate(['/musico-profile']);
    }
  }
  home(){
    this.router.navigate(['/feed']);
  }

 
  ngOnInit(): void {
    this.apiService.getData('musicos').subscribe((data) => {
      this.message = data.message;
      console.log(this.message);
    });
  }
}
