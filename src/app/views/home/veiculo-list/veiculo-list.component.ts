import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorista } from 'src/app/shared/model/motorista.model';
import { Veiculo } from 'src/app/shared/model/veiculo.model';
import { OperationDialogComponent } from 'src/app/shared/operation-dialog/operation-dialog.component';
import { VeiculoService } from 'src/app/shared/service/veiculo.service';
import { AddVeiculoFormComponent } from '../add-veiculo-form/add-veiculo-form.component';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  
  @Input() motoristaVeiculo: Motorista;
  @Input() motoristaId: number;
  veiculos$: Observable<Veiculo[]>;

  constructor(
    private veiculoService: VeiculoService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllVeiculos();
  }

  findAllVeiculos() {
    this.veiculos$ = this.veiculoService.findAllVeiculosByMotoristaId(this.motoristaId);
    this.cdRef.detectChanges;
  }

  onAddVeiculo(): void {
    const dialogAdd = this.dialog.open(AddVeiculoFormComponent, {
      minWidth: '40%',
      maxWidth: '50%',
      data: { 
        motorista: this.motoristaVeiculo,
        motoristaId : this.motoristaId
      }
    });

    dialogAdd.afterClosed().subscribe(result => { });
  }

  onDeleteVeiculo(veiculoId: number) {
    this.veiculoService.deleteVeiculo(veiculoId).subscribe(result => {
      this.onShowDialog(result, 'Excluir', '/dadosMotorista/' + this.motoristaId);
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
