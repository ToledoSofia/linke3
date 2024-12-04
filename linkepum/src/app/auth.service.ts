import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
// import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 
  private isLoggedIn: boolean = false; 

  constructor(private http: HttpClient) {}
  

  login(data: any): Observable<any> {
    this.isLoggedIn = true;
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
  
  deleteAccount(): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<any>(`${this.apiUrl}/user/delete`, { headers });
  }

  checkUserExists(username: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-user-exists`, {
      params: { username }
    });
  }

  getInstrumentos(musicoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/musico/${musicoId}/instrumentos`);
  }
  getInstrumentos2(musicoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/musico/${musicoId}/instrumentos2`);
  }
  getAllInstrumentos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/instrumentos`);
    
  }

  checkGroupExists(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkGroupExists`, { username });
  }

  registerGroup(groupData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerGroup`, groupData);
  }

  // createGroupWithRole(groupData: any): Observable<any> {
  //   console.log(groupData);
  //   return this.http.post(`${this.apiUrl}/createGroupWithRole`, groupData);
  // }

  getUserId(): number | null {
    const token = localStorage.getItem('token');
    
    if (token) {
      const parts = token.split('.');
  
      if (parts.length === 3) {
        try {
          const payload = parts[1];
          const decodedPayload = atob(payload.replace(/_/g, '/').replace(/-/g, '+')); // atob() decodifica Base64
  
          const decodedObject = JSON.parse(decodedPayload);
  
          return decodedObject.id || null; 
        } catch (error) {
          console.error('Error al decodificar el token manualmente:', error);
          return null;
        }
      }
    }
    return null; 
  }
  

}
