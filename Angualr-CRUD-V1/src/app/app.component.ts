import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StatusDialogComponent} from "./status-dialog/status-dialog.component";
import {StatusService} from "./servives/status.service";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CoreService} from "./core/core/core.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
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
    private _coreService: CoreService) {
  }

  panelOpenState = false;


  ngOnInit() {
    this.getStatusList()
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  openEditForm(data: any) {
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


}
