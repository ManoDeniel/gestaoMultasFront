import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Motorista } from 'src/app/shared/model/motorista.model';
import { MotoristaService } from 'src/app/shared/service/motorista.service';
import { AddMotoristaFormComponent } from '../add-motorista-form/add-motorista-form.component';

@Component({
  selector: 'app-dados-motorista',
  templateUrl: './dados-motorista.component.html',
  styleUrls: ['./dados-motorista.component.css']
})
export class DadosMotoristaComponent implements OnInit {

  public motoristaForm: FormGroup;

  motorista: Motorista;

  constructor(
    public formBuilder: FormBuilder,
    private motoristaService: MotoristaService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createFormMotorista();
  }

  createFormMotorista() {
    this.motoristaForm = this.formBuilder.group ({
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      numeroCNH: [null, [Validators.required]],
      rua: [null, [Validators.required]],
      numeroEndereco: [null, [Validators.required]],
      logradouro: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cep: [null, [Validators.required]],
      ddd: [null, [Validators.required]],
      numeroTelefone: [null, [Validators.required]],
      tipoTelefone: [null, [Validators.required]]
    });
  }

  onAddMotorista(): void {
    const dialogRef = this.dialog.open(AddMotoristaFormComponent, {
      minWidth: '40%',
      maxWidth: '50%'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  /* findMotorista() {
    this.motoristaService.findMotoristaById(motoristaId).subscribe(data => {
      this.motorista = data;
    });
    this.cdRef.detectChanges;
  } */
}
