import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StatusDialogComponent} from "./status-dialog/status-dialog.component";
import {StatusService} from "./servives/status.service";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CoreService} from "./core/core/core.service";
import {TicketService} from "./servives/ticket.service";
import {TicketDialogComponent} from "./ticket-dialog/ticket-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'Angualr-CRUD-V1';

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'date',
    'action',
    ]

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog: MatDialog,
    private _statusService: StatusService,
    private _ticketService: TicketService, // Hinzufügen des TicketService
    private _coreService: CoreService) {
  }

  panelStatusOpenState = false;
  panelTicketOpenState = false;


  ngOnInit() {
    this.getStatusList()
  }


  // Status-bezogene Methoden ----------------------------------------------------------------
  applyStatusTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openStatusDialog() {
    const dialogRef = this._dialog.open(StatusDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStatusList();
        }
      }
    });
  }

  getStatusList() {
    this._statusService.getStatusList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
  }


  deleteStatus(id: number) {
    this._statusService.deleteStatus(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Status deleted!', 'done')
        this.getStatusList();
      },
      error: console.log,
    });
  }

  openEditStatusForm(data: any) {
    const dialogRef = this._dialog.open(StatusDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStatusList()
        }
      }
    })
  }



  // Ticket-bezogene Methoden ----------------------------------------------------------------
  applyTicketTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTicketDialog() {
    const dialogRef = this._dialog.open(TicketDialogComponent);
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.getTicketList();
      }
    });
  }

  getTicketList() {
    this._ticketService.getTicketList().subscribe({
      next: (res) => {
        // Logik zum Aktualisieren Ihrer Ticket-Datenquelle
      },
      error: console.log,
    });
  }

  deleteTicket(id: number) {
    this._ticketService.deleteTicket(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Ticket deleted!', 'done');
        this.getTicketList();
      },
      error: console.log,
    });
  }

  openEditTicketForm(data: any) {
    const dialogRef = this._dialog.open(TicketDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        this.getTicketList();
      }
    });
  }

  // Weitere Ticket-bezogene Methoden können hier hinzugefügt werden

}



