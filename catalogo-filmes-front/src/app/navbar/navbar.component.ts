import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../models/perfil.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email: string = '';
  perfil: Perfil;
  termo: string;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.validateToken();
    this.perfil = this.userService.perfilSelecionado();
    this.email = this.userService.getUser().email;
  }

  public logout() {
    this.userService.logout()
  }

  public selecionarPerfil() {
    this.router.navigate(['/selecionarPerfil']);
  }

  public irParaHome() {
    this.router.navigate(['/home']);
  }

  public buscarTermo() {
    this.router.navigate(['.']).then(res => {
      this.router.navigate(['/buscar/' + this.termo]);
    });
  }

  public filmesParaAssistir() {
    this.router.navigate(['/filmesParaAssistir']);
  }

  public filmesAssistidos() {
    this.router.navigate(['/filmesAssistidos']);
  }
}
