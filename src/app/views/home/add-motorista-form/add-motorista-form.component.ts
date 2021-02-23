import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OperationDialogComponent } from 'src/app/shared/operation-dialog/operation-dialog.component';
import { MotoristaService } from 'src/app/shared/service/motorista.service';

@Component({
  selector: 'app-add-motorista-form',
  templateUrl: './add-motorista-form.component.html',
  styleUrls: ['./add-motorista-form.component.css']
})
export class AddMotoristaFormComponent implements OnInit {

  public motoristaForm: FormGroup
  
  constructor(
    public formBuilder: FormBuilder,
    public motoristaService: MotoristaService,
    public dialogRef: MatDialogRef<AddMotoristaFormComponent>,
    private dialog: MatDialog,
    public cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.motoristaForm = this.formBuilder.group ({
      cpf: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      numeroCNH: [null, [Validators.required]]
    });
  }

  onAddMotorista() {
    if (this.motoristaForm.valid) {
      this.motoristaService.postMotorista(this.motoristaForm.value).pipe()
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
    this.motoristaForm.reset();
  }

}
