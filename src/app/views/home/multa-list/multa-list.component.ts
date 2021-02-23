import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorista } from 'src/app/shared/model/motorista.model';
import { Multa } from 'src/app/shared/model/multa.model';
import { Veiculo } from 'src/app/shared/model/veiculo.model';
import { OperationDialogComponent } from 'src/app/shared/operation-dialog/operation-dialog.component';
import { MultaService } from 'src/app/shared/service/multa.service';
import { VeiculoService } from 'src/app/shared/service/veiculo.service';
import { AddMultaFormComponent } from '../add-multa-form/add-multa-form.component';

@Component({
  selector: 'app-multa-list',
  templateUrl: './multa-list.component.html',
  styleUrls: ['./multa-list.component.css']
})
export class MultaListComponent implements OnInit {

  @Input() motoristaMulta: Motorista;
  @Input() motoristaId: number;
  multas$: Observable<Multa[]>;

  constructor(
    private multaService: MultaService,
    private veiculoService: VeiculoService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.findAllMultas();
  }

  findAllMultas() {
    this.multas$ = this.multaService.findAllMultasByMotoristaId(this.motoristaId);
    this.cdRef.detectChanges;
  }

  onAddMulta(): void {
    const dialogAdd = this.dialog.open(AddMultaFormComponent, {
      minWidth: '40%',
      maxWidth: '60%',
      data: { 
        motorista: this.motoristaMulta,
        motoristaId : this.motoristaId
      }
    });

    dialogAdd.afterClosed().subscribe(result => { });
  }

  onDeleteMulta(veiculoId: number) {
    this.multaService.deleteMulta(veiculoId).subscribe(result => {
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
