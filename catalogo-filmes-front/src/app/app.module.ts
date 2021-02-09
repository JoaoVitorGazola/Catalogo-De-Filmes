import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';


// Dependencias do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NavbarComponent } from './navbar/navbar.component'
import { SelecaoDePerfilComponent } from './selecao-de-perfil/selecao-de-perfil.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FilmeComponent } from './filme/filme.component';
import { BuscaDeFilmeComponent } from './busca-de-filme/busca-de-filme.component';
import { FilmesAssistidosComponent } from './filmes-assistidos/filmes-assistidos.component';
import { FilmesParaAssistirComponent } from './filmes-para-assistir/filmes-para-assistir.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SelecaoDePerfilComponent,
    NavbarComponent,
    HomeComponent,
    FilmeComponent,
    BuscaDeFilmeComponent,
    FilmesAssistidosComponent,
    FilmesParaAssistirComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatPaginatorModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('429745335136234')
          }
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
