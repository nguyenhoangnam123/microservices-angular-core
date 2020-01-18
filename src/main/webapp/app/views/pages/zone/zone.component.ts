import { Component, OnInit, ViewChild } from '@angular/core';
import { ZoneService } from './zone.service';
import { LayoutUtilsService, QueryParamsModel } from 'app/core/_base/crud';
import { MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { ZoneDataSource } from './zone.data-source';
import { merge } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Zone } from './zone.model';
import { tap } from 'rxjs/operators';

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
  createZone() {}
  editZone() {}
  deleteZone() {}
}
