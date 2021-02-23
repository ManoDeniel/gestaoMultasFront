import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorista } from 'src/app/shared/model/motorista.model';
import { MotoristaService } from 'src/app/shared/service/motorista.service';

@Component({
  selector: 'app-motorista-list',
  templateUrl: './motorista-list.component.html',
  styleUrls: ['./motorista-list.component.css']
})
export class MotoristaListComponent implements OnInit {

  motoristas$: Observable<Motorista[]>;

  constructor(
    private motoristaService: MotoristaService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.findAllMotoristas();
  }

  findAllMotoristas() {
    this.motoristas$ = this.motoristaService.findAllMotoristas();
    this.cdRef.detectChanges;
  }

  onSelectMotorista(motoristaId: number) {
    this.router.navigate(['/dadosMotorista', motoristaId]);
  }
}
