import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  @Input() publicacion: any;
  imagenUrl: string = '';
  textoPublicacion: string = '';
  fechaPublicacion: string = '';
  likes: number = 0;
  nombrePublicador: string = '';

  ngOnInit(): void {
    if (this.publicacion) {
      this.imagenUrl = this.publicacion.imagen || '';
      this.textoPublicacion = this.publicacion.texto || '';
      this.fechaPublicacion = this.publicacion.fecha_publicacion || '';
      this.likes = this.publicacion.likes || 0;
      this.nombrePublicador = this.publicacion.Musico
                              ? `${this.publicacion.Musico.nombre} ${this.publicacion.Musico.apellido}`
                              : this.publicacion.Grupos
                                ? this.publicacion.Grupos.nombre
                                : 'Desconocido';
    }
  }

  likePost(): void {
    this.likes++;
  }

  commentPost(): void {
    alert('Abrir sección de comentarios');
  }
}
