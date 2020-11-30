import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/shared/model/veiculo.model';
import { VeiculoService } from 'src/app/shared/service/veiculo.service';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {

  veiculos: Veiculo[] = [];

  constructor(
    private veiculoService: VeiculoService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  findAllVeiculos() {
    this.veiculoService.findAllVeiculosByMotorista().subscribe(data => {
      this.veiculos = data;
    })
    this.cdRef.detectChanges;
  }

}
