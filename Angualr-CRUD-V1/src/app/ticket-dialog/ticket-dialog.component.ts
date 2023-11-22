import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StatusService} from "../servives/status.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../core/core/core.service";
import {StatusDialogComponent} from "../status-dialog/status-dialog.component";

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.css'
})
export class TicketDialogComponent implements OnInit {
  protected readonly status = status;

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



  onFormSubmit() {
    if (this.statusForm.valid) {
      if (this.data) {
        this._statusService
          .updateStatus(this.data.id, this.statusForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Status updated');
              this._dialogRef.close(true); // "true" referenz auf...
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
              this._dialogRef.close(true); // "true" referenz auf...
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      }
    }
  }
}




