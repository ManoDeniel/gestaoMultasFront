import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMotoristaFormComponent } from './add-motorista-form/add-motorista-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onAddMotorista(): void {
    const dialogAdd = this.dialog.open(AddMotoristaFormComponent, {
      minWidth: '40%',
      maxWidth: '50%'
    });

    dialogAdd.afterClosed().subscribe(result => { });
  }
}
