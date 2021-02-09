import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Filme } from '../models/filme.model';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public buscarFilmePorId(id: number): Observable<Filme> {
    return this.http.get<Filme>(environment.backEndUrl + "tmdb/buscarPorId/" + id, this.userService.getHeader());
  }

  public buscarFilmePorTermo(termo: string, pagina?: number): Observable<any> {
    let json = {
      pagina: pagina || 1,
      termo: termo
    }
    return this.http.post<any>(environment.backEndUrl + "tmdb/filmesPorTermo/", json, this.userService.getHeader());
  }
}
