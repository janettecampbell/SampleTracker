import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  baseUrl: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  addSample (sampleData: any): Observable<any> {
    const url = `${this.baseUrl}/sample`
    const headers = new HttpHeaders({
      "Content-type": "application/json"
    })

    return this.http.post(url, sampleData, {headers})
  }

  getSamples (): Observable<any> {
    const url = `${this.baseUrl}/sample`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })

    return this.http.get(url, {headers})
  }
}
