import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface Resultado<Type> {
  value: Type;
}
export interface Moeda {
  nomeFormatado: string;
  simbolo: string;
  tipoMoeda: string;
}
export interface Cotacao {
  cotacaoCompra: string;
  cotacaoVenda: string;
  dataHoraCotacao: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoedasService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private apiUrl =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json';

  private apiUrlprecoDolar =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=';
  getAll(): Observable<Resultado<Moeda[]>> {
    return this.http.get<Resultado<Moeda[]>>(this.apiUrl);
  }

  buscarValorData(data: Date): Observable<Resultado<Cotacao[]>> {
    var dataFormat = this.datePipe
      .transform(data, 'MM-dd-yyyy HH:mm:ss')
      ?.toString();
    return this.http.get<Resultado<Cotacao[]>>(
      this.apiUrlprecoDolar + dataFormat + '&$format=json'
    );
  }
}
