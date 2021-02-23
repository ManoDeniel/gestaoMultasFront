import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
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

  public findVeiculoById(veiculoId: number): Observable<Veiculo> {
    return this.httpClient.get<Veiculo>(this.apiUrl + '/' + veiculoId);
  }

  public findAllVeiculosByMotoristaId(motoristaId: number): Observable<Veiculo[]> {
    return this.httpClient.get<Veiculo[]>(this.apiUrl + '/motorista/' + motoristaId)
    .pipe(
      delay(2000)
    );
  }

  public postVeiculo(veiculo: Veiculo) {
    return this.httpClient.post(this.apiUrl, veiculo, { responseType: 'text' });
  }

  public deleteVeiculo(veiculoId: number) {
    return this.httpClient.delete(this.apiUrl + '/' + veiculoId, { responseType: 'text' });
  }
}
