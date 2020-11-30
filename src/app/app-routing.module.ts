import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DadosMotoristaComponent } from './views/home/dados-motorista/dados-motorista.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'homePage', pathMatch: 'full'},
  { path: 'homePage', component: HomeComponent },
  { path: 'dadosMotorista', component: DadosMotoristaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
