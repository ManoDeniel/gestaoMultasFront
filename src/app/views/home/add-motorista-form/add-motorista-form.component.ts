import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MotoristaService } from 'src/app/shared/service/motorista.service';

@Component({
  selector: 'app-add-motorista-form',
  templateUrl: './add-motorista-form.component.html',
  styleUrls: ['./add-motorista-form.component.css']
})
export class AddMotoristaFormComponent implements OnInit {

  public motoristaForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public motoristaService: MotoristaService,
    public dialogRef: MatDialogRef<AddMotoristaFormComponent>,
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
      this.motoristaService.postMotorista(this.motoristaForm.value).subscribe(result => {});
    }
    this.onClose();
    window.location.reload();
  }

  onClose(): void {
    this.dialogRef.close();
    this.motoristaForm.reset();
  }

}
