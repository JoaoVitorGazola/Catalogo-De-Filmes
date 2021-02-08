import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'
import { StorageService } from './storage.service';
import { User } from '../models/user.model';
import { RoutingService } from './routing.service';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: RoutingService,
    private storageService: StorageService
  ) { }

  setUser(user: User) {
    this.storageService.salvarItem("user", user);
  }

  getUser() {
    return this.storageService.getItem("user");
  }

  logout() {
    this.storageService.removeItem("user");
    this.storageService.removeItem("perfilSelecionado");
    this.router.navigateTo("");
  }

  selecionarPerfil(perfil: Perfil){
    this.storageService.salvarItem("perfilSelecionado", perfil);
  }

  perfilSelecionado(){
    return this.storageService.getItem("perfilSelecionado");
  }

  limparPerfilSelecionado(){
    this.storageService.removeItem("perfilSelecionado")
  }

  getHeader() {
    let user = this.storageService.getItem("user");

    let header = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.getUser().access_token}`,
        user: JSON.stringify(user),
        token: JSON.stringify(user.access_token)
      })
    };
    return header;
  }
}
