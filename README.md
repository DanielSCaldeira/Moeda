# Moeda App - Angular

Aplicativo web desenvolvido em Angular para consulta e exibição de cotações de moedas. Este projeto utiliza Angular CLI, Angular Material e segue boas práticas de arquitetura modular, componentização e uso de serviços.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Scripts Úteis](#scripts-úteis)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Conceitos Angular Utilizados](#conceitos-angular-utilizados)
  - [Componentes e Módulos](#componentes-e-módulos)
  - [Diretivas](#diretivas)
  - [Services e Injeção de Dependência](#services-e-injeção-de-dependência)
  - [Pipes](#pipes)
  - [Data Binding](#data-binding)
  - [Angular Router](#angular-router)
  - [Programação Reativa (RxJS)](#programação-reativa-rxjs)
- [Dicas e Boas Práticas](#dicas-e-boas-práticas)
- [Links Úteis](#links-úteis)

---

## Visão Geral

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 14.0.6. O objetivo é fornecer uma base sólida para aplicações Angular, com exemplos de organização de módulos, componentes, diretivas, serviços, pipes e integração com Angular Material.

## Requisitos

- Node.js >= 14.x
- NPM >= 6.x
- Angular CLI

## Instalação e Configuração

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd Moeda/app
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **(Opcional) Instale o plugin Auto Import no VS Code para facilitar importações.**

4. **Instale o Angular Material:**
   ```sh
   ng add @angular/material
   ```
   Siga as opções de layout (Dark, Light) conforme desejado.

## Scripts Úteis

- **Iniciar servidor de desenvolvimento:**
  ```sh
  ng serve
  ```
  Acesse: [http://localhost:4200/](http://localhost:4200/)

- **Build de produção:**
  ```sh
  ng build
  ```
  Os artefatos serão gerados em `dist/`.

- **Gerar componente:**
  ```sh
  ng generate component <caminho/nome>
  # ou
  ng g c <caminho/nome>
  ```

- **Gerar service:**
  ```sh
  ng generate service services/<nome>
  # ou
  ng g s services/<nome>
  ```

- **Rodar testes unitários:**
  ```sh
  ng test
  ```

- **Rodar testes end-to-end:**
  ```sh
  ng e2e
  ```

## Estrutura de Pastas

- `src/app/` - Código-fonte principal
  - `app.component.*` - Componente raiz
  - `config/` - Serviços de configuração
  - `model/` - Modelos de dados (interfaces/classes)
  - `services/` - Serviços (ex: consumo de APIs)
- `assets/` - Imagens, fontes e arquivos estáticos
- `environments/` - Variáveis de ambiente

## Conceitos Angular Utilizados

### Componentes e Módulos

O Angular organiza a aplicação em módulos (`NgModule`) e componentes. O fluxo de inicialização padrão é:

```
main.ts → AppModule → AppComponent → [outros componentes]
```

O `AppModule` é o módulo raiz e define:

- **declarations:** Componentes, diretivas e pipes do módulo
- **imports:** Módulos externos/importados
- **providers:** Serviços disponíveis
- **bootstrap:** Componente inicial da aplicação

Exemplo:
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

> **Obs:** Componentes são compostos por arquivos `.ts` (lógica), `.html` (template) e `.scss/.css` (estilo).

### Diretivas

Diretivas alteram aparência ou comportamento de elementos. Existem:

- **Atributo:** Ex: `[appRed]` altera cor do elemento.
- **Estrutural:** Ex: `*ngFor`, `*ngIf` alteram o DOM.

Exemplo de diretiva de atributo:
```ts
@Directive({ selector: '[appRed]' })
export class RedDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = 'red';
  }
}
```
Uso:
```html
<div appRed>Texto vermelho</div>
```

Exemplo de diretiva estrutural personalizada:
```ts
@Directive({ selector: '[myFor]' })
export class ForDirective implements OnInit {
  @Input('myForEm') numbers: number[];
  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {}
  ngOnInit(): void {
    for (let number of this.numbers) {
      this.container.createEmbeddedView(this.template, { $implicit: number });
    }
  }
}
```
Uso:
```html
<ul>
  <li *myFor="let n em [1,2,3]">{{n}}</li>
</ul>
```

### Services e Injeção de Dependência

Services são classes para lógica de negócio, acesso a dados e compartilhamento de informações entre componentes. São singletons por padrão (escopo do módulo).

Exemplo de service:
```ts
@Injectable({ providedIn: 'root' })
export class ProductService { /* ... */ }
```

**Injeção de dependência:**
```ts
constructor(private productService: ProductService) {}
```

### Pipes

Pipes transformam dados em templates. Exemplo:
```html
<p>{{ produto.vencimento | date | uppercase }}</p>
<p>{{ produto.preco | currency:'BRL' }}</p>
```

### Data Binding

- **Property Binding:** `[value]="nome"`
- **Event Binding:** `(click)="funcao()"`
- **Two-way Binding:** `[(ngModel)]="nome"`

### Angular Router

Gerencia navegação entre componentes. Exemplo de configuração:
```ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductComponent }
];
```
No template:
```html
<a routerLink="/products">Produtos</a>
<router-outlet></router-outlet>
```

### Programação Reativa (RxJS)

Utiliza Observables para programação orientada a eventos, facilitando manipulação de streams de dados e assincronismo.

---

## Dicas e Boas Práticas

- Organize componentes e serviços em módulos.
- Utilize Angular Material para UI consistente.
- Prefira Observables para manipulação de dados assíncronos.
- Separe lógica de apresentação (componentes) da lógica de negócio (services).
- Utilize pipes para formatação de dados em templates.

## Links Úteis

- [Documentação Angular](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)

---

> Documentação detalhada e atualizada por um especialista Angular. Para dúvidas, consulte os links acima ou abra uma issue.
