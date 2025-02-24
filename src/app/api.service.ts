import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getRoot(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getBeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}beams`);
  }

  sendData<T>(endpoint: string, data: T): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getSTLFile(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}get-stl`, { responseType: 'blob'}).pipe(
      catchError((error) => {
        console.error('Error fetching STL file:', error);
        return throwError(() => new Error(`HTTP Error, status:: ${error.status}`));
      })
    );
  }

  getMeshData(): Observable<any> {
    return this.http.get(`${this.baseUrl}mesh`);
  }
}
