import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public buscarPorUserId(): Observable<Perfil[]>{
    return this.http.get<Perfil[]>(environment.backEndUrl + "perfil/buscarPorUserId", this.userService.getHeader());
  } 

  public criarNovoPerfil(nome: string): Observable<any>{
    let json={
      nome: nome
    }
    return this.http.post<any>(environment.backEndUrl + "perfil/criarNovoPerfil", json, this.userService.getHeader());
  } 
}
