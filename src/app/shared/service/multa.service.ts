import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multa } from '../model/multa.model';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  apiUrl = 'http://localhost:8320/multas';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAllMultasByMotorista(): Observable<Multa[]> {
    return this.httpClient.get<Multa[]>(this.apiUrl);
  }

}
