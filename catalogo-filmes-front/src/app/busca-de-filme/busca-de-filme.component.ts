import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Filme } from '../models/filme.model';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-busca-de-filme',
  templateUrl: './busca-de-filme.component.html',
  styleUrls: ['./busca-de-filme.component.css']
})
export class BuscaDeFilmeComponent implements OnInit {
  filmes: Filme[] = [];
  totalSize: number;
  termo: string
  constructor(
    private spinner: NgxSpinnerService,
    private filmeService: FilmeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.termo = this.route.snapshot.params.termo;
    this.spinner.show()
    this.filmeService.buscarFilmePorTermo(this.termo).subscribe(res => {
      this.filmes = res.results;
      this.totalSize = res.total_results;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  public infoFilme(filme: Filme) {
    this.router.navigate(['/filme/' + filme.id]);
  }

  public paginarBusca(page) {
    this.spinner.show()
    this.filmeService.buscarFilmePorTermo(this.termo, page.pageIndex + 1).subscribe(res => {
      this.filmes = res.results;
      this.totalSize = res.total_results;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

}
