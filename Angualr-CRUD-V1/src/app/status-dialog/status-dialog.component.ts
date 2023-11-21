import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StatusService} from "../servives/status.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../core/core/core.service";

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrl: './status-dialog.component.css'
})
export class StatusDialogComponent implements OnInit {

  protected readonly status = status;

  /*
  // Dropdown Logik hier einfügen (min 24:00)

  eductaion: string[] = [
    'Hauptschule',
    'Realschule',
    'Gymnasium',
    'Universität',
    'Andere'
  ];

  HTML
    <div class="row">
    <mat-form-field appearance="fill">
      <mat-label>Favorite food</mat-label>
      <mat-select>
        <mat-option *ngFor="let val of education" [value]="val">{{val}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  */


  statusForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _statusService: StatusService,
    private _dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.statusForm = this._fb.group({
      title: '',
      author: '',
      date: ''
      // priority: '',
    });
  }

  ngOnInit() {
    this.statusForm.patchValue(this.data);
  }


  // checkt ob das Formular valide ist
  onFormSubmit() {
    if (this.statusForm.valid) {
      if (this.data) {
        this._statusService
          .updateStatus(this.data.id, this.statusForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Status updated');
              this._dialogRef.close(true); // "true" connection between components
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._statusService
          .addStatus(this.statusForm.value)
          .subscribe({
            next: (val: any) => {
              alert("");
              this._coreService.openSnackBar('Status added successfully');
              this._dialogRef.close(true); // "true" connection between components
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
    }
  }
}

