import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface Resultado<Type> {
  value?: Type;
}
export interface Moeda {
  nomeFormatado?: string;
  simbolo?: string;
  tipoMoeda?: string;
}
export interface Cotacao {
  cotacaoCompra?: number;
  cotacaoVenda?: number;
  dataHoraCotacao?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoedasService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  private apiUrl =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json';
  getAll(): Observable<Resultado<Moeda[]>> {
    return this.http.get<Resultado<Moeda[]>>(this.apiUrl);
  }

  private apiUrlprecoDolar =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=';
  buscarValorData(data: Date): Observable<Resultado<Cotacao[]>> {
    let dataFormat = this.datePipe.transform(data, 'MM-dd-yyyy');
    let url = decodeURI(
      this.apiUrlprecoDolar + "'" + dataFormat + "'" + '&$format=json'
    );
    return this.http.get<Resultado<Cotacao[]>>(url);
  }

  private urlBuscarValoresDatas =
    'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40';
  buscarValoresDatas(
    dataInicio: Date,
    dataFim: Date
  ): Observable<Resultado<Cotacao[]>> {
    let dataInicioFormat = this.datePipe.transform(dataInicio, 'MM-dd-yyyy');
    let dataFimFormat = this.datePipe.transform(dataFim, 'MM-dd-yyyy');
    let url = decodeURI(
      this.urlBuscarValoresDatas +
        'dataInicial=' +
        "'" +
        dataInicioFormat +
        "'" +
        '&%40dataFinalCotacao=' +
        "'" +
        dataFimFormat +
        "'" +
        '&$format=json'
    );
    return this.http.get<Resultado<Cotacao[]>>(url);
  }
}
