import { Component, OnInit, ViewChild } from '@angular/core';
import { ZoneService } from './zone.service';
import { LayoutUtilsService, QueryParamsModel, MessageType } from 'app/core/_base/crud';
import { MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { ZoneDataSource } from './zone.data-source';
import { merge } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Zone } from './zone.model';
import { tap } from 'rxjs/operators';
import { ZoneEditDialogComponent } from './zone-edit/zone-edit.component';

@Component({
  selector: 'jhi-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  dataSource: ZoneDataSource;
  displayedColumns = ['id', 'name', 'actions'];
  count: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selection = new SelectionModel<Zone>(true, []);
  constructor(
    private zoneService: ZoneService,
    private layoutUtilsService: LayoutUtilsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    /* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadItems();
        })
      )
      .subscribe();

    // Init DataSource
    this.dataSource = new ZoneDataSource(this.zoneService);
    // First load
    this.loadItems(true);
  }

  loadItems(firstLoad: boolean = false) {
    const queryParams = new QueryParamsModel(
      {},
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      firstLoad ? 6 : this.paginator.pageSize
    );
    this.dataSource.loadItems(queryParams);
    this.selection.clear();
  }
  createZone() {
    const zone = new Zone();
    zone.clear();
    this.editZone(zone);
  }
  editZone(_zone: Zone) {
    const _saveMessage = `Zone successfully has been saved.`;
    const _messageType = _zone.id ? MessageType.Update : MessageType.Create;
    const dialogRef = this.dialog.open(ZoneEditDialogComponent, { data: { zoneId: _zone.id } });
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
      this.loadItems(true);
    });
  }
  deleteZone() {}
}
