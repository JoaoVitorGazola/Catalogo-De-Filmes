import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Perfil } from '../models/perfil.model';
import { PerfilService } from '../services/perfil.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-selecao-de-perfil',
  templateUrl: './selecao-de-perfil.component.html',
  styleUrls: ['./selecao-de-perfil.component.css']
})
export class SelecaoDePerfilComponent implements OnInit{
  perfis: Perfil[] = [];
  criandoPerfil = false;
  nomeNovoPerfil: string = '';

  constructor(
    private perfilService: PerfilService,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit() {
    this.buscarPerfis();
  }

  private buscarPerfis(){
    this.spinner.show()
    this.perfilService.buscarPorUserId().subscribe(res =>{
      this.perfis = res;
      this.spinner.hide();
    },
    err=>{
      this.spinner.hide();
    });
  }

  public selecionarPerfil(id: number){
    this.userService.limparPerfilSelecionado();
    this.userService.selecionarPerfil(this.perfis[id]);
    this.router.navigate(['/home']);
  }

  public criarNovoPerfil(){
    if(!this.nomeNovoPerfil)
      return;
    this.spinner.show()
    this.perfilService.criarNovoPerfil(this.nomeNovoPerfil).subscribe(res=>{
      this.criandoPerfil = false;
      this.nomeNovoPerfil = '';
      this.spinner.hide();
      this.buscarPerfis();
    },
    err=>{
      this.spinner.hide();
      this.buscarPerfis();
    });
  }
}
