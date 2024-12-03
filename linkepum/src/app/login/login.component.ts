import { AuthService } from '../auth.service'; 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  musico: any = null;
  errorMessage: string | null = null; 

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(
          (response: any) => {
            if (response.auth) {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/musico-profile']);
              this.getUserData(); 
            }
          },
          error => {
            this.errorMessage = 'Usuario o contraseña incorrectos'; 
            console.error('Error en el login', error);
        
            if (error.status === 401) {
              this.loginForm.get('username')?.setErrors({ invalidLogin: true });
              this.loginForm.get('password')?.setErrors({ invalidLogin: true });
              this.loginForm.reset();
            }
          }
        );
    }
  }

  getUserData(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any>('http://localhost:3000/user/me', { headers })
      .subscribe(
        data => {
          this.musico = data;
          console.log('Datos del usuario:', this.musico);
        },
        error => {
          console.error('Error al obtener los datos del musico', error);
        }
      );
  }
  
  navigateToSignIn() {
    this.router.navigate(['/signup']); 
  }

}