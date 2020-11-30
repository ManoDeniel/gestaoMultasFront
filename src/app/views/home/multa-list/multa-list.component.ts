import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MultaService } from 'src/app/shared/service/multa.service';

@Component({
  selector: 'app-multa-list',
  templateUrl: './multa-list.component.html',
  styleUrls: ['./multa-list.component.css']
})
export class MultaListComponent implements OnInit {

  multas: Multa[] = [];

  constructor(
    private multaService: MultaService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  findAllMultas() {
    this.multaService.findAllMultasByMotorista().subscribe(data => {
      this.multas = data;
    })
    this.cdRef.detectChanges;
  }

}
