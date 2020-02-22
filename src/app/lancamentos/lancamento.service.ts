import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient , HttpHeaders , HttpParams } from '@angular/common/http';

import * as moment from 'moment';



export class LancamentoFilter {

  descricaoPesquisa: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;


}




@Injectable()
export class LancamentoService {

  lancamentosUrl =  'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

      pesquisar(filtro: LancamentoFilter): Promise<any> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      let params = new HttpParams();
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());



      if (filtro.descricaoPesquisa) {
          params = params.set('descricao', filtro.descricaoPesquisa);
      }

      if (filtro.dataVencimentoInicio) {
        params = params.set('dataVencimentoDe',
         moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

      return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
          .toPromise()
          .then(response => {
            // tslint:disable-next-line: semicolon
            const lancamentos = response['content']
            const resultado = {
              lancamentos,
              total: response['totalElements']
               // tslint:disable-next-line: semicolon
            };
            return resultado;
             // tslint:disable-next-line: semicolon
          })

        }

        excluir(codigo: number): Promise<void> {
          const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
          return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers})
          .toPromise()
          .then(() => null);
        }
      }








