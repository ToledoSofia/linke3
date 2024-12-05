import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getData(type: 'musicos' | 'grupos'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${type}`);
  }
  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${userId}`);
  }




  // Obtener datos del usuario por ID
  getUserData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${userId}`);
  }

  // Obtener instrumentos del usuario por ID
  getUserInstrumentos(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/musico/${userId}/instrumentos2`);
  }

  // Obtener grupos del usuario por ID
  getUserGrupos(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/musico/${userId}/grupos`);
  }


 
  
}
