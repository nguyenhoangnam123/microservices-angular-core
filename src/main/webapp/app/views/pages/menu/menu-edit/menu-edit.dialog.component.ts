// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Observable, of, Subscription } from 'rxjs';
import { MenuItem, MenuService } from 'app/core/_base/layout';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/core/reducers';
import { User, currentUser } from 'app/core/auth';
import { MenuDataSource } from '../menu.data-source';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { startWith, map, tap, concatMap } from 'rxjs/operators';
import { ValidParentMenuValidator } from '../menu.validator';

@Component({
  selector: 'kt-menu-edit-dialog',
  templateUrl: './menu-edit.dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class MenuEditDialogComponent implements OnInit, OnDestroy {
  dataSource: MenuDataSource;
  currentUser: User;
  user$: Observable<User>;
  menuItem: MenuItem;
  menuParentItem: MenuItem;
  menuList: MenuItem[];
  menu$: Observable<MenuItem>;
  filterMenus: Observable<MenuItem[]>;
  menuForm: FormGroup;
  hasFormErrors = false;
  selectedTab = 0;
  //initialize subcription array
  private subscriptions: Subscription[] = [];
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<MenuEditDialogComponent>
   * @param data: any
   * @param store: Store<AppState>
   */
  constructor(
    private menuService: MenuService,
    public dialogRef: MatDialogRef<MenuEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuFB: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //asign #menu$ to an Observable<MenuItem>
    if (this.data.menuId) {
      this.menu$ = this.menuService.findById(this.data.menuId);
    } else {
      const menu = new MenuItem();
      menu.clear();
      this.menu$ = of(menu);
    }

    this.menuService
      .getAllItems()
      .pipe(
        tap(res => {
          if (!res) {
            return;
          }
          this.menuList = res;
        }),
        concatMap(() => this.menu$),
        tap(res => {
          if (!res) {
            return;
          }
          this.menuItem = res;
          for (let i = 0; i < this.menuList.length; i++) {
            if (this.menuList[i].id === this.menuItem.parentId) {
              this.menuParentItem = Object.assign({}, this.menuList[i]);
              return;
            }
          }
        })
      )
      .subscribe(() => this.createForm());

    //asign user$ to an Observable
    this.user$ = this.store.pipe(select(currentUser));

    const userSubscription = this.user$.subscribe(res => {
      if (!res) {
        return;
      }
      this.currentUser = res;
    });

    // Init DataSource
    this.dataSource = new MenuDataSource(this.menuService);

    //push all subcriptions to array
    this.subscriptions.push(userSubscription);
    // this.subscriptions.push(menuSubcription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  /** UI */
  /**
   * Returns component title
   */
  getTitle(): string {
    if (this.menuItem && this.menuItem.id) {
      return `Cập nhật menu ${this.menuItem.name}`;
    }
    // tslint:disable-next-line:no-string-throw
    return 'New menu';
  }

  /**
   * Create form
   */
  createForm() {
    this.menuForm = this.menuFB.group(
      {
        name: [this.menuItem.name, Validators.required],
        description: [this.menuItem.description],
        menuIconCss: [this.menuItem.menuIconCss],
        url: [this.menuItem.url],
        path: [this.menuItem.path],
        parent: [this.menuParentItem],
        displayOrder: [this.menuItem.displayOrder, Validators.required]
      },
      {
        validator: ValidParentMenuValidator(this.menuList)
      }
    );

    //create autocomplete data
    this.filterMenus = this.menuForm.controls.parent.valueChanges.pipe(
      startWith<string | MenuItem>(this.menuParentItem ? this.menuParentItem : ''),
      map(value => (typeof value === 'string' ? value : (value as any).name)),
      map(name => (name ? this._filter(name) : this.menuList.slice().filter(option => option.id !== this.menuItem.id)))
    );
  }

  /**
   * Returns menu for save
   */
  prepareMenu(): MenuItem {
    const controls = this.menuForm.controls;
    const _menu = new MenuItem();
    _menu.id = this.menuItem.id;
    _menu.name = controls.name.value;
    _menu.description = controls.description.value ? controls.description.value : '';
    _menu.menuIconCss = controls.menuIconCss.value ? controls.menuIconCss.value : '';
    _menu.url = controls.url.value ? controls.url.value : '';
    _menu.path = controls.path.value ? controls.path.value : '';
    _menu.parentId = controls.parent.value ? controls.parent.value.id : '';
    _menu.displayOrder = controls.displayOrder.value;
    _menu.isDeleted = this.menuItem.isDeleted;
    _menu.updateBy = 'admin';
    return _menu;
  }

  /**
   * Close alert
   *
   * @param $event: Event
   */
  onAlertClose($event) {
    this.hasFormErrors = false;
  }

  /**
   * Returns is title valid
   */
  isTitleValid(): boolean {
    return this.menuItem && this.menuItem.name && this.menuItem.name.length > 0;
  }

  /**
   * Save data
   */
  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.menuForm.controls;
    /** check form */
    if (this.menuForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const editedMenu = this.prepareMenu();
    this.createOrUpdateMenu(editedMenu);
  }

  /**
   * Create or update menu
   *
   * @param _menu: Menu
   */
  createOrUpdateMenu(menu: MenuItem) {
    console.log(menu);
    if (!menu.id) {
      // menu.createdBy = this.currentUser.username ? this.currentUser.username : 'admin';
      menu.createdBy = 'admin';
      menu.isDeleted = false;
    }
    this.dataSource.createOrUpdateItem(menu);

    const createOrUpdateSubscription = this.dataSource.createOrUpdateSucess$.subscribe(res => {
      if (!res) {
        return;
      }

      const dialogData = menu.id > 0 ? { menu, isEdit: true } : { menu, isEdit: false };
      this.dialogRef.close(dialogData);
    });

    this.subscriptions.push(createOrUpdateSubscription);
  }

  displayFn(menu?: MenuItem): string | undefined {
    return menu ? menu.name : undefined;
  }

  private _filter(name): MenuItem[] {
    const filterValue = name.toLowerCase();

    return this.menuList
      .filter(option => option.id !== this.menuItem.id)
      .filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
