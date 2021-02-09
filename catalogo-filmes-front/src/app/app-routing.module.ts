import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaDeFilmeComponent } from './busca-de-filme/busca-de-filme.component';
import { FilmeComponent } from './filme/filme.component';
import { FilmesAssistidosComponent } from './filmes-assistidos/filmes-assistidos.component';
import { FilmesParaAssistirComponent } from './filmes-para-assistir/filmes-para-assistir.component';
import { LoggedGuard } from './guards/logged.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { HomeComponent } from './home/home.component';
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
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'filmesAssistidos',
    component: FilmesAssistidosComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'filmesParaAssistir',
    component: FilmesParaAssistirComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'filme/:id',
    component: FilmeComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'buscar/:termo',
    component: BuscaDeFilmeComponent,
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
