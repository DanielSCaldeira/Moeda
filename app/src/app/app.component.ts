import { Component } from '@angular/core';
import { MoedasService } from './services/moedas.service';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private moedasService: MoedasService) {
    this.getMoedas();
    this.buscarValorData();
  }

  listaMoedas: Moeda[] = [];
  cotacao = {};
  selectedValue = {};
  data: Date = new Date();

  getMoedas(): void {
    this.moedasService.getAll().subscribe((result) => {
      this.listaMoedas = result.value;
    });
  }

  buscarValorData(): void {
    this.moedasService.buscarValorData(this.data).subscribe((result) => {
      this.cotacao = result.value;
    });
  }
}
