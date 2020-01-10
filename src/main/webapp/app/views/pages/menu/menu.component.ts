// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuDataSource } from './menu.data-source';
// RXJS
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
// Crud
import { QueryParamsModel } from '../../../core/_base/crud';
import { MenuItem, MenuService } from '../../../core/_base/layout';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
// Services
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';

@Component({
  selector: 'jhi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dataSource: MenuDataSource;
  displayedColumns = ['id', 'name', 'actions'];
  count: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<MenuItem>(true, []);
  /**
   * Component constructor
   *
   * @param menuService: DataTableService
   * @param layoutUtilsService: LayoutUtilsService
   */
  constructor(private menuService: MenuService, private layoutUtilsService: LayoutUtilsService) {}

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
    this.dataSource = new MenuDataSource(this.menuService);
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

  deleteMenu(_item: MenuItem) {
    const _title = 'Menu';
    const _description = 'Are you sure to permanently delete this menu?';
    const _waitDesciption = 'Menu is deleting...';
    const _deleteMessage = `Menu has been deleted`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      //show message confirm that item is deleted completely
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
      //load new items
      this.loadItems(true);
    });
  }
}
