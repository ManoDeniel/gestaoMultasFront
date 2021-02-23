import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
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

  public findAllMultasByMotoristaId(motoristaId: number): Observable<Multa[]> {
    return this.httpClient.get<Multa[]>(this.apiUrl + '/motorista/' + motoristaId)
    .pipe(
      delay(2000)
    );
  }

  public postMulta(multa: Multa) {
    return this.httpClient.post(this.apiUrl, multa, { responseType: 'text' });
  }

  public deleteMulta(multaId: number) {
    return this.httpClient.delete(this.apiUrl + '/' + multaId, { responseType: 'text' });
  }
}
