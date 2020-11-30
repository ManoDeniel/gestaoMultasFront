import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motorista } from '../model/motorista.model';

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

  public findMotoristaById(motoristaId: number): Observable<Motorista> {
    return this.httpClient.get<Motorista>(this.apiUrl + '/' + motoristaId);
  }

  public postMotorista(motorista: Motorista): Observable<Motorista> {
    return this.httpClient.post<Motorista>(this.apiUrl, motorista, this.httpOptions);
  }
}
