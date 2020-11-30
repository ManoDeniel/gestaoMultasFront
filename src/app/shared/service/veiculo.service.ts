import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../model/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  apiUrl = 'http://localhost:8320/veiculos';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAllVeiculosByMotorista(): Observable<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(this.apiUrl);
  }
}
