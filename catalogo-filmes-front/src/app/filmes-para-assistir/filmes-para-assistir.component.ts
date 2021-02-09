import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from '../models/filme.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-filmes-para-assistir',
  templateUrl: './filmes-para-assistir.component.html',
  styleUrls: ['./filmes-para-assistir.component.css']
})
export class FilmesParaAssistirComponent implements OnInit {
  filmes: Filme[];
  filmesPaginados: Filme[];
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (!this.userService.perfilSelecionado())
      this.router.navigate(['/selecionarPerfil']);
    this.filmes = this.userService.perfilSelecionado().filmesParaAssistir;
    this.filmesPaginados = this.filmes.slice(0, 20);
  }


  public infoFilme(filme: Filme) {
    this.router.navigate(['/filme/' + filme.id]);
  }

  public paginarBusca(page) {
    var end = ((page.pageIndex + 1) * 20);
    if (end > this.filmes.length)
      end = this.filmes.length;
    this.filmesPaginados = this.filmes.slice(page.pageIndex * 20, end);
  }

}
