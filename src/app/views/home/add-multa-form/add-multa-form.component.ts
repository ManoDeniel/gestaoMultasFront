import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Veiculo } from 'src/app/shared/model/veiculo.model';
import { OperationDialogComponent } from 'src/app/shared/operation-dialog/operation-dialog.component';
import { MultaService } from 'src/app/shared/service/multa.service';
import { VeiculoService } from 'src/app/shared/service/veiculo.service';

@Component({
  selector: 'app-add-multa-form',
  templateUrl: './add-multa-form.component.html',
  styleUrls: ['./add-multa-form.component.css']
})
export class AddMultaFormComponent implements OnInit {

  public multaForm: FormGroup;
  motoristaId: number;
  veiculos$: Observable<Veiculo[]>;
  veiculoSelected: number;

  constructor(
    public formBuilder: FormBuilder,
    public multaService: MultaService,
    private veiculoService: VeiculoService,
    private dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMultaFormComponent>
  ) { }

  ngOnInit(): void {
    this.motoristaId = this.data.motoristaId;
    this.createForm();
    this.findAllVeiculos();
  }

  findAllVeiculos() {
    this.veiculos$ = this.veiculoService.findAllVeiculosByMotoristaId(this.motoristaId);
    this.cdRef.detectChanges;
  }

  createForm() {
    this.multaForm = this.formBuilder.group({
      numeroInfracao: [null, [Validators.required]],
      tipoInfracao: [null, [Validators.required]],
      descricaoInfracao: [null, [Validators.required]],
      orgaoAutuador: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      pontuacao: [null, [Validators.required]],
      dataEmissao: [null, [Validators.required]],
      dataVencimento: [null, [Validators.required]],
      motoristaId: [this.motoristaId, [Validators.required]],
      veiculoId: [null, [Validators.required]]
    });
  }

  onAddMulta() {
    this.multaForm.get('veiculoId')?.setValue(this.veiculoSelected);
    if (this.multaForm.valid) {
      this.multaService.postMulta(this.multaForm.value).pipe()
      .subscribe(dados => {
        this.onConfirmAdd(dados);
      });
    }
    this.onClose();
  }
  
  onConfirmAdd(result: String): void {
    const dialogConfirm = this.dialog.open(OperationDialogComponent, {
      data: {
        operation: 'Cadastro',
        message: result
      }
    });
    dialogConfirm.afterClosed().subscribe(closed => { 
      window.location.reload();
    });
  }

  onClose(): void {
    this.dialogRef.close();
    this.multaForm.reset();
  }
}
