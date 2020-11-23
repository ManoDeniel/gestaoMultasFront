import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Motorista } from 'src/app/shared/model/motorista.model';
import { MotoristaService } from 'src/app/shared/service/motorista.service';

@Component({
  selector: 'app-motorista-list',
  templateUrl: './motorista-list.component.html',
  styleUrls: ['./motorista-list.component.css']
})
export class MotoristaListComponent implements OnInit {

  motoristas: Motorista[] = [];

  constructor(
    private motoristaService: MotoristaService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.findAllMotoristas();
  }

  findAllMotoristas() {
    this.motoristaService.findAllMotoristas().subscribe(data => {
      this.motoristas = data;
    })
    this.cdRef.detectChanges;
  }
}
