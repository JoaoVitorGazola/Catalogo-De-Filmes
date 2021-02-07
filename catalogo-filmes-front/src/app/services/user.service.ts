import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { StorageService } from './storage.service';
import { User } from '../models/user.model';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
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

  selecionarPerfil(id: number){
    this.storageService.salvarItem("perfilSelecionado", id);
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
        "Authorization": `Bearer ${this.getUser().token.accessToken}`,
        user: JSON.stringify(user.userRO),
        token: JSON.stringify(user.token)
      })
    };

    return header;
  }
}
