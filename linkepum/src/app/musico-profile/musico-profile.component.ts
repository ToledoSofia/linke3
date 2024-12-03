
  import { Component, OnInit , Inject, PLATFORM_ID } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { AuthService } from '../auth.service';
  import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
  import { MatDialog } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { isPlatformBrowser } from '@angular/common';
  import { EditProfileComponent } from '../edit-profile/edit-profile.component';
  import { ImageCropperDialogComponent } from '../image-cropper-dialog/image-cropper-dialog.component';



  @Component({
    selector: 'app-musico-profile',
    templateUrl: './musico-profile.component.html',
    styleUrl: './musico-profile.component.css'
  })
  export class MusicoProfileComponent  implements OnInit {
    musico: any;
    private isBrowser: boolean;
    instrumentos: string[] = [];
    currentUserId: number | null = null; 
    grupos : any[] = [];

    constructor(
      private http: HttpClient,
      private authService: AuthService,
      private dialog: MatDialog,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
      this.getUserData();
    }

    isCurrentUser(): boolean {
      return this.musico && this.musico.idMusico === this.currentUserId;
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
                this.currentUserId = this.musico.idMusico;  
                console.log('Datos del usuario:', this.musico);
                this.getInstrumentos();
                this.getGrupos(); 

              },
              error => {
                console.error('Error al obtener los da tos del usuario', error);
              }
            );
        } else {
          console.error('No se encontró un token en el localStorage');
          this.router.navigate(['/login']);
        }
      }
    }

    logout() {
      this.authService.logout(); 
      this.router.navigate(['/login']);
    }
    deleteAccount(): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

          this.http.delete<any>('http://localhost:3000/user/delete', { headers })
          .subscribe(
            response => {
              console.log('Cuenta eliminada con éxito:', response);
              this.authService.logout();
              this.router.navigate(['/login']);
            },
            error => {
              console.error('Error al eliminar la cuenta', error);
            }
          );
        }
      });
    }

    navigateToCreateGroup() {
      console.log("netrafkdfh");
      this.router.navigate(['/create-group']);
    }

    updateProfile(): void {
      const dialogRef = this.dialog.open(EditProfileComponent, {
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getUserData(); 
        }
      });
    }
    changeProfilePhoto(): void {
      this.openImageCropDialog('profile');
    }

    changeCoverPhoto(): void {
      this.openImageCropDialog('cover');
    }

    openImageCropDialog(photoType: string): void {
      const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
        width: '600px',
        data: { photoType: photoType }  
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.uploadPhoto(result, photoType);
        }
      });
    }

    
    getGrupos(): void {
      const token = localStorage.getItem('token');

      if (token) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        this.http.get<any[]>(`http://localhost:3000/musico/${this.currentUserId}/grupos`, { headers })
          .subscribe(
            (data) => {
              this.grupos = data; 
              console.log('Grupos del usuario:', this.grupos);
            },
            (error) => {
              console.error('Error al obtener los grupos del usuario:', error);
            }
          );
      } else {
        console.error('No se encontró un token en el localStorage');
      }
    }


    uploadPhoto(imageUrl: string, photoType: string): void {
      const token = localStorage.getItem('token');
      
      if (token) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        const updateData = photoType === 'profile' ? { foto_perfil: imageUrl } : { foto_portada: imageUrl };

        this.http.put<any>(`http://localhost:3000/user/update`, updateData, { headers })
          .subscribe(
            response => {
              this.getUserData(); 
            },
            error => {
              console.error('Error al actualizar la foto', error);
            }
          );
      }
    }

    getInstrumentos(): void {
      if (this.musico && this.musico.idMusico) {
        this.authService.getInstrumentos(this.musico.idMusico).subscribe(
          (data: { instrumentos: string[] }) => {
            this.instrumentos = data.instrumentos;
            console.log('Instrumentos:', this.instrumentos); 
          },
          error => {
            console.error('Error al obtener los instrumentos', error);
          }
        );
      }
    }
  }
