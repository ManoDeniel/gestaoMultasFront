import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog  } from '@angular/material/dialog';
import { Motorista } from 'src/app/shared/model/motorista.model';
import { MotoristaService } from 'src/app/shared/service/motorista.service';
import { AddMotoristaFormComponent } from '../add-motorista-form/add-motorista-form.component';
import { Endereco } from 'src/app/shared/model/endereco.model';
import { Telefone } from 'src/app/shared/model/telefone.model';
import { OperationDialogComponent } from 'src/app/shared/operation-dialog/operation-dialog.component';

@Component({
  selector: 'app-dados-motorista',
  templateUrl: './dados-motorista.component.html',
  styleUrls: ['./dados-motorista.component.css']
})
export class DadosMotoristaComponent implements OnInit {

  public motoristaForm: FormGroup;
  motorista = new Motorista();
  motoristaId: number;

  constructor(
    public formBuilder: FormBuilder,
    private motoristaService: MotoristaService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createFormMotorista();
    this.route.params.subscribe(params => {
      this.motoristaId = + params['id'];
    })
    this.findMotorista(this.motoristaId);
  }

  createFormMotorista() {
    this.motoristaForm = this.formBuilder.group ({
      cpf: [null],
      nome: [null],
      sobrenome: [null],
      numeroCNH: [null],
      rua: [null],
      numeroEndereco: [null],
      logradouro: [null],
      bairro: [null],
      cidade: [null],
      estado: [null],
      cep: [null],
      numeroTelefone: [null],
      tipoTelefone: [null]
    });
  }

  onLoadForm(motorista: Motorista) {
    this.onSetMotorista(motorista);
  }
  
  onSetMotorista(motorista: Motorista) {
    if (motorista != null) {
      this.motoristaForm.patchValue({
        cpf: motorista.cpf,
        nome: motorista.nome,
        sobrenome: motorista.sobrenome,
        numeroCNH: motorista.numeroCNH
      });
      this.onSetEndereco(motorista.endereco);
      this.onSetTelefone(motorista.telefone);
    }
  }

  onSetEndereco(endereco: Endereco) {
    if (endereco != null) {
      this.motoristaForm.patchValue({
        rua: endereco.rua,
        numeroEndereco: endereco.numero,
        logradouro: endereco.tipoLogradouro,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep
      });
    }
  }

  onSetTelefone(telefone: Telefone) {
    if (telefone != null) {
      this.motoristaForm.patchValue({
        numeroTelefone: telefone.numero,
        tipoTelefone: telefone.tipoTelefone
      });
    }
  }

  onAddMotorista(): void {
    const dialogRef = this.dialog.open(AddMotoristaFormComponent, {
      minWidth: '40%',
      maxWidth: '50%'
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  findMotorista(motoristaId: number) {
    this.motoristaService.findMotoristaById(motoristaId).subscribe(data => {
      if (data != null) {
        this.motorista = data;
        this.onLoadForm(data);
      }
    });
    this.cdRef.detectChanges;
  }

  onAtualizarMotorista(motoristaId: number) {
    const enderecoForm: Endereco = {
      rua: this.motoristaForm.get('rua')?.value,
      numero: this.motoristaForm.get('numeroEndereco')?.value,
      tipoLogradouro: this.motoristaForm.get('logradouro')?.value,
      bairro: this.motoristaForm.get('bairro')?.value,
      cidade: this.motoristaForm.get('cidade')?.value,
      estado: this.motoristaForm.get('estado')?.value,
      cep: this.motoristaForm.get('cep')?.value
    };
    const telefoneForm: Telefone = {
      numero: this.motoristaForm.get('numeroTelefone')?.value,
      tipoTelefone: this.motoristaForm.get('tipoTelefone')?.value
    }
    const motorista: Motorista = {
      motoristaId: this.motoristaId,
      cpf: this.motoristaForm.get('cpf')?.value,
      nome: this.motoristaForm.get('nome')?.value,
      sobrenome: this.motoristaForm.get('sobrenome')?.value,
      numeroCNH: this.motoristaForm.get('numeroCNH')?.value,
      endereco: enderecoForm,
      telefone: telefoneForm
    };
    if (this.motoristaForm.valid) {
      this.motoristaService.updateMotorista(motorista, motoristaId)
      .subscribe(result => {
        this.onShowDialog(result, 'Atualizar', '/homePage');
      })
    }
  }

  onDeleteMotorista(motoristaId: number): void {
    this.motoristaService.deleteMotorista(motoristaId).subscribe(result => {
      this.onShowDialog(result, 'Excluir', '/homePage');
    });
  }
  
  onShowDialog(result: String, operation: String, destination: String): void {
    const dialogRef = this.dialog.open(OperationDialogComponent, {
      data: {
        operation: operation,
        message: result
      }
    });
    dialogRef.afterClosed().subscribe(closed => {
      this.router.navigate([destination]);
    });
  }
}
