import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelecaoDePerfilComponent } from './selecao-de-perfil/selecao-de-perfil.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'selecionarPerfil',
    component: SelecaoDePerfilComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
