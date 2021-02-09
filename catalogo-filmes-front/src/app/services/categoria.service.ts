import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public buscarTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(environment.backEndUrl + "categorias/findAll", this.userService.getHeader());
  }

  public filmesPorGenero(generoId: number, pagina?: number): Observable<any> {
    let json = {
      pagina: pagina || 1
    }
    return this.http.post<any>(environment.backEndUrl + "tmdb/filmesPorGenero/" + generoId, json, this.userService.getHeader());
  }
}
