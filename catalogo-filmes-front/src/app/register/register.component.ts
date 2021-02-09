import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  passwordConfirmation: string;
  erro: string;
  
  constructor(
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  public register(){
    if(!this.email){
      this.erro = "Insira um e-mail";
      return;
    }
    if(!this.password){
      this.erro = "Insira uma senha";
      return;
    }
    if(!this.passwordConfirmation){
      this.erro = "Confirme a senha";
      return;
    }
    if(this.password != this.passwordConfirmation){
      this.erro = "As senhas não são iguais";
      return;
    }
    this.spinner.show();
    var newUser: User = new User();
    newUser.email = this.email;
    newUser.password = this.password;
    this.authservice.register(newUser).subscribe(
        data => {
          this.erro = null;
          this.spinner.hide();
          this.snackBar.open("Conta criada com sucesso", "X", {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        err => {
          this.erro = err.error.message;
          this.spinner.hide();
        });
  }

  public alertar(mensagem: string){
    alert(mensagem);
  }
}
