import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Categoria } from '../models/categoria.model';
import { Filme } from '../models/filme.model';
import { CategoriaService } from '../services/categoria.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categorias: Categoria[] = [];
  filmesSugeridos: Filme[] = [];
  filmes: [Filme[]] = [[]];
  totalSizeSugeridos: number = 0;
  totalSize = [];
  constructor(
    private spinner: NgxSpinnerService,
    private categoriaService: CategoriaService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.userService.perfilSelecionado())
      this.router.navigate(['/selecionarPerfil']);
    this.buscarCategorias();
    this.buscarFilmesSugeridos();
  }

  private buscarCategorias() {
    this.spinner.show();
    this.categoriaService.buscarTodas().subscribe(res => {
      this.categorias = res;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }


  private buscarFilmesSugeridos() {
    this.spinner.show();
    this.userService.buscarFilmesSugeridos().subscribe(res => {
      this.filmesSugeridos = res.results;
      this.totalSizeSugeridos = res.total_results;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  public tabClick(tab) {
    if (tab.index > 0 && !this.filmes[this.categorias[tab.index - 1].id]) {
      this.spinner.show()
      this.categoriaService.filmesPorGenero(this.categorias[tab.index - 1].id).subscribe(res => {
        this.filmes[this.categorias[tab.index - 1].id] = res.results;
        this.totalSize[this.categorias[tab.index - 1].id] = res.total_results;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      })
    }
  }

  public paginarSugeridos(page) {
    this.spinner.show();
    this.userService.buscarFilmesSugeridos(page.pageIndex + 1).subscribe(res => {
      this.filmesSugeridos = res.results;
      this.totalSizeSugeridos = res.total_results;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
      });
  }

  public paginarCategoria(page, categoria: Categoria) {
    this.spinner.show()
    this.categoriaService.filmesPorGenero(categoria.id, page.pageIndex + 1).subscribe(res => {
      this.filmes[categoria.id] = res.results;
      this.totalSize[categoria.id] = res.total_results;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  public infoFilme(filme: Filme) {
    this.router.navigate(['/filme/' + filme.id]);
  }

}
