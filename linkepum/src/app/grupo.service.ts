import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = 'http://localhost:3000/crearGrupoConMusico'; 

  constructor(private http: HttpClient) {}

  crearGrupoConMusico(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  getInstrumentos(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/instrumentos`);
  }
}
