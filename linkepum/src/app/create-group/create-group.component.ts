import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GrupoService } from '../grupo.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Instrumento {
  idInstrumento: number;
  nombre: string;
  tipo_instrumento: string;
}

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})


export class CreateGroupComponent {
  grupoForm: FormGroup;
  instrumentos :Instrumento [] = []; 
  roles = ['Voz', 'Guitarra', 'Bateria'];

  constructor(private fb: FormBuilder, private grupoService: GrupoService, private httpClient: HttpClient) {
    this.grupoForm = this.fb.group({
      nombreGrupo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      instrumentoId: ['', Validators.required], 
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarInstrumentos();
  }

  cargarInstrumentos() {
    this.grupoService.getInstrumentos().subscribe(
      (data) => {
        this.instrumentos = data;
      },
      (error) => {
        console.error('Error al cargar instrumentos', error);
      }
    );
  }

  crearGrupo() {
    if (this.grupoForm.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const formValues = this.grupoForm.value;
    const token = localStorage.getItem('token');  

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.httpClient.post('http://localhost:3000/crearGrupoConMusico', formValues, { headers })
      .subscribe(
        response => {
          console.log('Grupo creado correctamente', response);
        },
        error => {
          console.error('Error al crear el grupo', error);
        }
      );
  }
}