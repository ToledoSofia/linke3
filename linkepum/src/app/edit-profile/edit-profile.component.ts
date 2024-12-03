import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  musico: any = {};
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        this.http.get<any>('http://localhost:3000/user/me', { headers })
          .subscribe(
            data => {
              this.musico = data;
            },
            error => {
              console.error('Error al obtener los datos del usuario', error);
            }
          );
      } else {
        console.error('No se encontró un token en el localStorage');
      }
    }
  }

  onSubmit(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        this.http.put<any>('http://localhost:3000/user/update', this.musico, { headers })
          .subscribe(
            response => {
              console.log('Datos actualizados con éxito:', response);
              this.dialogRef.close(true); 
            },
            error => {
              console.error('Error al actualizar los datos del usuario', error);
            }
          );
      }
    }
  }
}
