import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export class PessoaFilter {
  nomePessoa: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  content = 'content';
  totalElements = 'totalElements';
  constructor(private http: HttpClient) { }


  pesquisar(filtro: PessoaFilter): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nomePessoa) {
      params.set('nome', filtro.nomePessoa);

    }
    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        // tslint:disable-next-line: semicolon
        const pessoas = response[this.content]
        const resultado = {
          pessoas,
          total: response[this.totalElements]
          // tslint:disable-next-line: semicolon
        };
        return resultado;
        // tslint:disable-next-line: semicolon
      })

  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => {
        // tslint:disable-next-line: semicolon
        const pessoas = response[this.content]
        const resultado = {
          pessoas,
          total: response[this.totalElements]
        };
      return resultado;
    });

  }
}









