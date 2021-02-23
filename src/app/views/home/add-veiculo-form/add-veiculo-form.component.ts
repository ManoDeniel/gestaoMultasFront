import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationDialogComponent } from 'src/app/shared/operation-dialog/operation-dialog.component';
import { VeiculoService } from 'src/app/shared/service/veiculo.service';

@Component({
  selector: 'app-add-veiculo-form',
  templateUrl: './add-veiculo-form.component.html',
  styleUrls: ['./add-veiculo-form.component.css']
})
export class AddVeiculoFormComponent implements OnInit {

  public veiculoForm: FormGroup;
  motoristaId: number;

  constructor(
    public formBuilder: FormBuilder,
    public veiculoService: VeiculoService,
    private dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddVeiculoFormComponent>
  ) { }

  ngOnInit(): void {
    this.motoristaId = this.data.motoristaId;
    this.createForm();
  }

  createForm() {
    this.veiculoForm = this.formBuilder.group ({
      marca: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      anoFabricacao: [null, [Validators.required]],
      cor: [null, [Validators.required]],
      placa: [null, [Validators.required]],
      numeroRenavam: [null, [Validators.required]],
      motoristaId: [this.motoristaId, [Validators.required]]
    });
  }

  onAddVeiculo() {
    if (this.veiculoForm.valid) {
      this.veiculoService.postVeiculo(this.veiculoForm.value).pipe()
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
    this.veiculoForm.reset();
  }
}
