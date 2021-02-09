import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SocialAuthService, FacebookLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  erro = '';

  constructor(
    private authservice: AuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
  }

  public login() {
    if (!this.email) {
      this.erro = "Insira o e-mail";
      return;
    }
    if (!this.password) {
      this.erro = "Insira a senha";
      return;
    }
    this.spinner.show();
    var newUser: User = new User();
    newUser.email = this.email;
    newUser.password = this.password;
    this.authservice.login(newUser).subscribe(
      data => {
        this.erro = null;
        this.userService.setUser(data);
        this.spinner.hide();
        this.router.navigate(['/selecionarPerfil']);
      },
      err => {
        this.erro = err.error.message;
        this.spinner.hide();
      });
  }

  public loginComFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }

}
