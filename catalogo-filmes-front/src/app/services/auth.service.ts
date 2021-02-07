import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public login(body: User): Observable<any> {
    return this.http.post<User>(environment.backEndUrl + "auth/login", body);
  }

  public register(body: User): Observable<any> {
    let json={
      user: body
    };
    return this.http.post<User>(environment.backEndUrl + "auth/register", json);
  }

  public validateToken() {
    this.http.get(environment.backEndUrl + "auth/validateToken", this.userService.getHeader()).subscribe(
      response => { },
      err => {
        this.userService.logout();
      }
    );
  }

}
