import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.getUser()) {
        if(this.userService.perfilSelecionado())
            this.router.navigate(["/home"]);
        else
            this.router.navigate(["/selecionarPerfil"]);
      return false;
    } else {
      this.userService.limparPerfilSelecionado();
      return true;
    }
  }

}
