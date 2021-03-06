import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';






@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFilter();
  lancamentos = [];
  codigo: number;

  @ViewChild('tabela') grid;


  constructor(private lancamentoService: LancamentoService,
    private toasty: ToastyService) { }

  ngOnInit() {
     }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;


    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;

      });
  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if (this.grid.first === 0) {
         this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.toasty.success('Lançamento excluído com sucesso!');
   });
}


}



