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

  public postMotorista(motorista: Motorista) {
    return this.httpClient.post(this.apiUrl, motorista, { responseType: 'text' });
  }

  public deleteMotorista(motoristaId: number) {
    return this.httpClient.delete(this.apiUrl + '/' + motoristaId, { responseType: 'text' });
  }

  public updateMotorista(motorista: Motorista, motoristaId: number) {
    return this.httpClient.put(this.apiUrl + '/' + motoristaId, motorista, { responseType: 'text' });
  }
}
