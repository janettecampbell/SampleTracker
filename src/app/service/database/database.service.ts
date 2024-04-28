import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  baseUrl: string = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getSampleByStyleNumber(sampleStyleNumber: string): Observable<any> {
    const url = `${this.baseUrl}/sample/${sampleStyleNumber}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })
    return this.http.get(url, {headers});
  }

  updateSample (sampleId: string, updateData: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })

    return this.http.put(`${this.baseUrl}/sample/${sampleId}`, updateData, {headers})
  }

  addSample (sampleData: any): Observable<any> {
    const url = `${this.baseUrl}/sample`
    const headers = new HttpHeaders({
      "Content-type": "application/json"
    })

    return this.http.post(url, sampleData, {headers})
  }

  deleteSample(sampleId: string) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/sample/${sampleId}`)
  }

  getSamples (): Observable<any> {
    const url = `${this.baseUrl}/sample`;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    })

    return this.http.get(url, {headers})
  }
}
