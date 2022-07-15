import { Component } from '@angular/core';
import { MoedasService } from './services/moedas.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  datainicio?: Date = new Date();
  datafim?: Date = new Date();
  listaMoedas?: Moeda[] = [];
  cotacao?: Cotacao = {};
  cotacoes?: Cotacao[] = [];
  data: Date = new Date();
  dolarHoje?: Cotacao = {};
  selectedValue?: Date = new Date();
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  displayedColumns: string[] = [
    'weight',
    'cotacaoCompra',
    'cotacaoVenda',
    'dataHoraCotacao',
  ];

  today: Date = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  day = this.today.getDay();
  dataSource = new MatTableDataSource<Cotacao>(this.cotacoes);

  constructor(private moedasService: MoedasService) {
    this.getMoedas();
    this.buscarValorData();
    this.buscarDolarHoje();
  }

  getMoedas(): void {
    this.moedasService.getAll().subscribe((result) => {
      this.listaMoedas = result.value;
    });
  }

  buscarValorData(): void {
    this.moedasService.buscarValorData(this.data).subscribe((result) => {
      this.cotacao = result.value != null ? result.value[0] : result.value;
    });
  }

  buscarValoresDatas(): void {
    this.moedasService
      .buscarValoresDatas(
        this.range.value.start ? this.range.value.start : new Date(),
        this.range.value.end ? this.range.value.end : new Date()
      )
      .subscribe((result) => {
        this.cotacoes = result.value;
        this.dataSource = new MatTableDataSource<Cotacao>(this.cotacoes);
      });
  }

  buscarDolarHoje(): void {
    this.moedasService.buscarValorData(new Date()).subscribe((result) => {
      this.dolarHoje =
        result.value != null
          ? result.value[result.value.length - 1]
          : result.value;
    });
  }
}
