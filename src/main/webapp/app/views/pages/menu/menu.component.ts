// Angular
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MenuDataSource } from './menu.data-source';
// RXJS
import { tap, startWith, map } from 'rxjs/operators';
import { merge, Observable, Subscription } from 'rxjs';
// Crud
import { QueryParamsModel } from '../../../core/_base/crud';
import { MenuItem, MenuService } from '../../../core/_base/layout';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
// Services
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
import { MenuEditDialogComponent } from './menu-edit/menu-edit.dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidParentMenuValidator } from './menu.validator';

@Component({
  selector: 'jhi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  dataSource: MenuDataSource;
  displayedColumns = ['id', 'name', 'actions'];
  menuSearchForm: FormGroup;
  count: number;
  menuList: MenuItem[];
  filterMenus: Observable<MenuItem[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private subscriptions: Subscription[] = [];

  selection = new SelectionModel<MenuItem>(true, []);
  /**
   * Component constructor
   *
   * @param menuService: DataTableService
   * @param layoutUtilsService: LayoutUtilsService
   */
  constructor(
    private menuService: MenuService,
    private layoutUtilsService: LayoutUtilsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private menuFB: FormBuilder
  ) {}

  ngOnInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    /* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
    const sortAndPagingSubcription = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadItems();
        })
      )
      .subscribe();

    // Init DataSource
    this.dataSource = new MenuDataSource(this.menuService);
    // Subcribe deleteSucessfully, refresh list when subscribe
    this.dataSource.deleteSuccess$.subscribe(() => {
      this.loadItems(true);
    });
    // First load
    this.loadItems(true);
    // Subcribe getMenu List
    this.menuService
      .getAllItems()
      .pipe(
        tap(res => {
          if (!res) {
            return;
          }
          this.menuList = res;
        })
      )
      .subscribe(() => this.createForm());

    // this.subscriptions.push(menuListSubcription);
    this.subscriptions.push(sortAndPagingSubcription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
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
      this.dataSource.deleteItem(_item.id);
      //show message confirm that item is deleted completely
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
    });
  }

  createForm() {
    // Init menuSearchForm
    this.menuSearchForm = this.menuFB.group(
      {
        name: ['', Validators.maxLength(5)],
        url: ['', Validators.maxLength(5)],
        parent: ['']
      },
      {
        validator: ValidParentMenuValidator(this.menuList)
      }
    );

    // Filtermenus
    this.filterMenus = this.menuSearchForm.controls.parent.valueChanges.pipe(
      startWith<string | MenuItem>(''),
      map(value => (typeof value === 'string' ? value : (value as any).name)),
      map(name => (name ? this._filter(name) : this.menuList.slice()))
    );
  }

  createMenu() {
    const menu = new MenuItem();
    menu.clear();
    this.editMenu(menu);
  }

  editMenu(_menu: MenuItem) {
    const _saveMessage = `Menu successfully has been saved.`;
    const _messageType = _menu.id ? MessageType.Update : MessageType.Create;
    const dialogRef = this.dialog.open(MenuEditDialogComponent, { data: { menuId: _menu.id } });

    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }

      this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, true);
      this.loadItems(true);
    });
  }

  /**
   * Clear form search
   */
  onCancel() {
    this.menuSearchForm.reset();
  }

  /**
   * Submit form search
   */
  searchMenu(searchObj) {}

  /**
   * Display autocomplete on parent values changed
   */
  displayFn(menu?: MenuItem): string | undefined {
    return menu ? menu.name : undefined;
  }

  /**
   * Filter values from input changed
   */
  private _filter(name): MenuItem[] {
    const filterValue = name.toLowerCase();

    return this.menuList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
