import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CoreService } from "../core/core/core.service";
import { TicketService} from "../servives/ticket.service";

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css']
})
export class TicketDialogComponent implements OnInit {

  ticketForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _ticketService: TicketService,
    private _dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.ticketForm = this._fb.group({
      title: '',
      author: '',
      date: '',
      priority: '',
    });
  }

  ngOnInit() {
    this.ticketForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.ticketForm.valid) {
      if (this.data) {
        this._ticketService
          .updateTicket(this.data.id, this.ticketForm.value)
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
        this._ticketService
          .addTicket(this.ticketForm.value)
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
