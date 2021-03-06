import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OrdiniComponent } from './pages/ordini/ordini.component';
//components for routing
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './auth/authentication.guard';
import { ProdottiComponent } from './pages/prodotti/prodotti.component';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { AnalisiComponent } from './pages/analisi/analisi.component';
import { AcquistiComponent } from './pages/acquisti/acquisti.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'prodotti',
    component: ProdottiComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'ordini',
    component: OrdiniComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'analisi',
    component: AnalisiComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'acquisti',
    component: AcquistiComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
