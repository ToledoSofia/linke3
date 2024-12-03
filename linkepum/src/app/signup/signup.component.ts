import { AuthService } from '../auth.service'; 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signUp: FormGroup;
  userExists = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signUp = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      contrasenaRepetida: ['', Validators.required],
      ubicacion: ['']
    }, { validator: this.passwordMatchValidator });
    this.signUp.get('usuario')?.valueChanges.subscribe(value => {
      if (value) {
        this.checkIfUserExists(value);
      }
    });
  }

  checkIfUserExists(username: string): void {
    this.authService.checkUserExists(username).subscribe(response => {
      this.userExists = response.exists;
      if (this.userExists) {
        this.signUp.get('usuario')?.setErrors({ userExists: true });
      } else {
        this.signUp.get('usuario')?.setErrors(null);
      }
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('contrasena')?.value;
    const confirmPassword = group.get('contrasenaRepetida')?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    // Clear any existing userExists error before submitting
    this.signUp.get('usuario')?.setErrors(null);
    
    if (this.signUp.valid && !this.userExists) {
      this.authService.register(this.signUp.value).subscribe(
        response => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error en el registro', error);
        }
      );
    }
  }

  // onSubmit(): void {
  //   this.userExists = false;
  //   const username = this.signUp.get('usuario')?.value;
  //   this.authService.checkUserExists(username).subscribe(userExists => {
  //     if (userExists) {
  //       this.signUp.get('usuario')?.setErrors({ userExists: true });
  //       this.userExists = true;
  //     } else {
  //       this.userExists = false;
  //       if (this.signUp.valid && !this.userExists) {
  //         this.authService.register(this.signUp.value).subscribe(
  //           response => {
  //             this.authService.saveToken(response.token);
  //             this.router.navigate(['/login']);
  //           },
  //           error => {
  //             console.error('Error en el registro', error);
  //           }
  //         );
  //       }
  //     }
  //   });
  // }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

}





