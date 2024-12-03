import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  publicaciones: any[] = [];

  constructor(private publicacionService: PublicacionService, private authService : AuthService) { }

  ngOnInit(): void {
    this.loadPublicaciones();
  }

  loadPublicaciones(): void {
    this.publicacionService.getPublicaciones().subscribe(
      data => {
        this.publicaciones = data;
        console.log('Publicaciones cargadas:', this.publicaciones);
      },
      error => {
        console.error('Error al cargar las publicaciones:', error);
      }
    );
  }

}
