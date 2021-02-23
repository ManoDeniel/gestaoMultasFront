import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { HomeComponent } from './views/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MotoristaListComponent } from './views/home/motorista-list/motorista-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMotoristaFormComponent } from './views/home/add-motorista-form/add-motorista-form.component';
import { DadosMotoristaComponent } from './views/home/dados-motorista/dados-motorista.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MultaListComponent } from './views/home/multa-list/multa-list.component';
import { VeiculoListComponent } from './views/home/veiculo-list/veiculo-list.component';
import { AddVeiculoFormComponent } from './views/home/add-veiculo-form/add-veiculo-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddMultaFormComponent } from './views/home/add-multa-form/add-multa-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MotoristaListComponent,
    AddMotoristaFormComponent,
    DadosMotoristaComponent,
    MultaListComponent,
    VeiculoListComponent,
    AddVeiculoFormComponent,
    AddMultaFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
