import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number | null = null; // ID del usuario que se mostrará
  userData: any; // Datos del usuario seleccionado
  instrumentos: any[] = [];
  grupos: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Obtener el ID de la URL
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // '+' convierte el parámetro a número
      if (this.userId) {
        this.loadUserData();
      }
    });
  }

  loadUserData(): void {
    if (this.userId) {
      this.apiService.getUserData(this.userId).subscribe(data => {
        this.userData = data; // Datos básicos del usuario
        this.loadUserInstrumentos();
        this.loadUserGrupos();
      });
    }
  }

  loadUserInstrumentos(): void {
    if (this.userId) {
      this.apiService.getUserInstrumentos(this.userId).subscribe(data => {
        this.instrumentos = data.instrumentos;
        console.log(this.instrumentos);
      });
    }
  }

  
  loadUserGrupos(): void {
    if (this.userId) {
      this.apiService.getUserGrupos(this.userId).subscribe((data: any[]) => {
        this.grupos = data.map((grupo: any) => ({
          ...grupo,
          activo: grupo.GruposMusicos?.activo || false 
        }));
      });
    }
  }
  
}
