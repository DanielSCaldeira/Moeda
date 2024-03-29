# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Minhas anotações

### Instalação

Instalar plugin alto import no vs code.

### Criar projeto comandos

```sh
npm install -g @angular/cli
ng new <nomeprojeto>
cd <nomeprojeto>
```

### Instalar Angular Material

```sh
ng add @angular/material
```

1. Vai aparecer as opções de layout disponivel.(Dark, light)

### Inicia o projeto http://localhost:4200/

```sh
ng serve
```

### Criar um componente

```sh
ng g c <caminho do arquivo exemplo "components/template/header">
```

1. g = generate
2. c = componente

### Arvore de inicialização

Main.ts -> AppModule -> AppComponent -> Faz referencias aos componentes criados

AppComponent

1. bootstrap: Aponta para o componente que vai ser iniciado na aplicação

Obs: Os componentes em angular são organizados em módulos

### Cada componente possui:

HTML, CSS, TS

### Pastas

Assets: imagens, arquivos estaticos e arquivo de fonte
Environments: variaveis de ambiente.

### Organização usando Módulos

Pode ser determinado a um componente se ele vai ser visivel para outros módulos ou não.

![alt text](https://github.com/DanielSCaldeira/Moeda/blob/main/app/src/assets/imagem/anatomia-modulo.png?raw=true)

1. Todo módulo tem 5 atributos para ser configurar são eles DECLARATIONS, EXPORT, IMPORTS, PROVIDERS, BOOTSTRAP
   1.1 DECLARATIONS: São os componentes, diretivas e pipes que fazem parte de determinado módulo.
   1.2 EXPORTS: É um comjunto de elementos que vão ser visivel fora do módulo podemdo ser componentes, diretivas e pipes  
   1.3 IMPORTS: É utilizado para importar outros módulos como dependencia co seu módulo.
   1.4 PROVIDERS: Declara os services
   1.5 BOOTSTRAP: Carrega os componentes que vão ser utilizados no módulo.

2. AppModule importa os módulos criados

3. app.module.ts

```sh
import { Componente Importado } from 'caminho do componente';

@NgModule({
declarations: [Todos os compontentes que você fez ou ira utiliar nesse módulo(Componentes, diretivas e pipes)],
imports: [Todos os componetes importados ou sejá dependencias da aplicação],
providers: [DatePipe],
bootstrap: [Componente que vai inicializar a aplicação],
})
export class AppModule {}
```

### Diretivas

Altera a aparencia e o comportamento de um elemento, componente ou outra diretiva. Diretiva inserida por atributo.

### Criando Diretiva de atributo

Alterando a aparencia do elemento

```sh
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})

export class RedDirective {
  constructor(private el: ElementRef){
      el.nativeElement.style.color = 'red';
  }

}
```

HTML

```sh
  <div appRed></div>
```

### Criando Diretiva estrutural

```sh
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})

export class ForDirective implements OnInit{
  # implements pode ser OnChange para ele modificar identificar o que foi modficado "orDirective implements OnChange"
  # Contrução é nome da diretiva mais o que vem dentro do atributo. Ele vai pegar o valor depois da palavra "Em"
  @Input('myForEm') numbers: number[]

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ){}

  ngOnInit(): void{
      for(let number od this.numbers){
        #implicit disponibiliza para o front end o valor atual
        this.container.createEmbeddedView(this.template, {$implicit: number})
      }
  }

}
```

HTML

```sh
  <ul>
    <li *myFor="let n em [1,2,3] teste 'gggg'"></li>
  </ul>
```

#### Decorator

@Directive({selector: 'nome-seletor'})

### Diretiva Estrutural

Altera o layout adicionando e removendo elementos do DOM.
A diferença de uma diretiva estrututal por uma diretiva por atributo é o asterisco (*).
Exemplo: *ngFor="", \*ngIf=""

### Binding

#### Property Binding

Para ter uma ligação entre o html e a controller é necessario inserir o atributo entre colchetes [] -> [dataSource]="nome da variavel que está na controller".

#### Event Binding

Para ligar um evento exemplo de click é necessários os parenteses. Exemplo: (click)="funcao na controller"

#### One Way Data Binding

Pega o valor da variavel que está na controller e mostra no html, tem somente uma unica direção controller -> html. Utiliza o atributo [value]="nome da variavel na controller". Exemplo:

```sh
<imput [value]="nome"/>
```

#### Two Way Data Binding

Para que o valor sejá atualizado em ambas direçoes controller <-> HTML utlizar [(ngModel)]="nome da variavel na controller"

### Angular Router

Arquivo app-config.modulo.ts
Tem que fazer o mapeamento da rota/componente.
Router outlet é um componente que faz pare do componente router e ele é resposável por carregar a opção selecionada pelo o usuário

Exemplo: HTML

```sh
<a routerLink="/products"></a>
```

Exemplo: Mapeamento

```sh
import {HomeComponent} "caminho"
import {ProductComponent} "caminho"

const routes: Router = [
  {
    path: "", <"" = rota default quando for carregado a pagina>
    component: HomeComponent
  },
    {
    path: "products",
    component: ProductComponent
  },
];
```

### Angular Pipes

Pode ter um encadeamento de pipes.
Exemplo: HTML

```sh
<p>{{produto.vencimento | date | uppercase }}</p>
<p>{{produto.preço | currency: 'BRL' }}</p>
```

### Programação Reativas (RXJS)

Programação reativa tem como conceito de que quando acontecer um evento sejá disparado uma reação e o programa realiza alguma atividade.Tornando assim um programa com menos processamento.

#### Padrão Observer

1. Padrão orientado a evento.
2. Subject fica responsável por identificar o evento ocorrido e avisar os interresados pelo o evento.

### Services

São classes que tem como objetico organizar e compartilhar métodos e dados entre componentes. A classe tem somente uma instancia todos os componentes vão instaciar a mesma classe.

Services são singletons (uma unica instancia) dentro do escopo de um injector

#### Criar Services

ng = cli comand interface angular
g = genetate
s = services

```sh
ng g s services/Product
ng g s services/<nome da service>
```

#### Generate

```sh
@Injectable({
  providedIn: "root",
})
export class ProductService{
  ///...
}
```

#### ProvidedIn: "root"

O root é um alias para o AppModule e como tem somente um AppModule ele vai ser instaciado somente uma unica vez.
O providedIn pode ser um alias para qualquer modulo que você criar, mas para referenciar a um modulo diferente de root ou seja AppModule,
deve importar o modulo e passar ele como alias.

```sh
import { NovoModule } from 'caminho do componente';

@Injectable({
  providedIn: NovoModule,
})
export class ProductService{
  ///...
}
```

#### @Injectable

Quando é atribuido o atributo @injectable a uma classe isso avisa ao angular que essa classe pode ser injetada. Fazendo com que o angular instacie a classe e torne disponivel para ser injetada dentro de uma classe que necessite dessa instancia.

Classe com atributo @Injectable -> Angular framework -> Classe que precisa da instancia

1. Quando é atribuido o @Injectable a uma classe isso quer dizer que essa classe pode ser injetada.
2. Essa classe com o atributo, informa ao angular que ele deve, instaciar a classe. (A classe está disponivel no framework)
3. E quando eu necessitar dessa classe em um construtor o angular ira prover a dependecia. (A injeção da classe)

#### Injeção de Dependência

É o padrão no qual a classe recebe as dependêmcias de uma fonte externa ão inves de criar por conta própria.

Sem injeção de dependencias

```sh
 class Carro{
  motor: Motor

  constructor(){
    this.motor = new Motor()
  }
}
```

Com injeção de dependencias

```sh
 class Carro{
  motor: Motor

  constructor(motor: Motor){
    this.motor = motor
  }
}
```

### Injector
