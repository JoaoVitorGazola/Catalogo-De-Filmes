import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Filme } from '../models/filme.model';
import { FilmeService } from '../services/filme.service';
import { PerfilService } from '../services/perfil.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {
  filme: Filme
  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private spinner: NgxSpinnerService,
    private perfilService: PerfilService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.filmeService.buscarFilmePorId(this.route.snapshot.params.id).subscribe(res => {
      this.filme = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })
  }

  public adicionarAAssistidos() {
    this.spinner.show();
    this.perfilService.adicionarAFilmesAssistidos(this.filme).subscribe(res => {
      this.userService.limparPerfilSelecionado();
      this.userService.selecionarPerfil(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  public adicionarAParaAssistir() {
    this.spinner.show();
    this.perfilService.adicionarAFilmesParaAssistir(this.filme).subscribe(res => {
      this.userService.limparPerfilSelecionado();
      this.userService.selecionarPerfil(res);
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }
}
