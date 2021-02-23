import { ChangeDetectorRef, Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.interface';

@Component({
  selector: 'operation-dialog-component',
  templateUrl: 'operation-dialog-component.html',
})
export class OperationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<OperationDialogComponent>,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}