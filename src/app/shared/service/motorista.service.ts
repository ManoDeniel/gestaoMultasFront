import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorista } from '../model/motorista.model';
import { Pageable } from '../model/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  apiUrl = 'http://localhost:8320/motoristas';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAllMotoristas(): Observable<Motorista[]> {
    return this.httpClient.get<Motorista[]>(this.apiUrl);
  }
}
