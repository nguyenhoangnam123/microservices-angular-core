// Angular
import { Component, OnInit, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// RxJS
import { Observable, of, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'app/core/reducers';
import { User, currentUser } from 'app/core/auth';
import { ZoneDataSource } from '../zone.data-source';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Zone } from '../zone.model';
import { ZoneService } from '../zone.service';

@Component({
  selector: 'kt-zone-edit-dialog',
  templateUrl: './zone-edit.dialog.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ZoneEditDialogComponent implements OnInit, OnDestroy {
  dataSource: ZoneDataSource;
  currentUser: User;
  user$: Observable<User>;
  zoneItem: Zone;
  zoneList: Zone[];
  zone$: Observable<Zone>;
  zoneForm: FormGroup;
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
    private zoneService: ZoneService,
    public dialogRef: MatDialogRef<ZoneEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private zoneFB: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //asign #menu$ to an Observable<MenuItem>
    if (this.data.zoneId) {
      this.zone$ = this.zoneService.findById(this.data.zoneId);
    } else {
      const zone = new Zone();
      zone.clear();
      this.zone$ = of(zone);
    }

    //init form after loading zone
    const zoneSubcription = this.zone$.subscribe(res => {
      this.zoneItem = res;
      this.createForm();
    });

    //asign user$ to an Observable
    this.user$ = this.store.pipe(select(currentUser));

    const userSubscription = this.user$.subscribe(res => {
      if (!res) {
        return;
      }
      this.currentUser = res;
    });

    // Init DataSource
    this.dataSource = new ZoneDataSource(this.zoneService);

    //push all subcriptions to array
    this.subscriptions.push(userSubscription);
    this.subscriptions.push(zoneSubcription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  /** UI */
  /**
   * Returns component title
   */
  getTitle(): string {
    if (this.zoneItem && this.zoneItem.id) {
      return `Edit menu ${this.zoneItem.name}`;
    }
    // tslint:disable-next-line:no-string-throw
    return 'New menu';
  }

  /**
   * Create form
   */
  createForm() {
    this.zoneForm = this.zoneFB.group({
      name: [this.zoneItem.name, Validators.required],
      code: [this.zoneItem.code]
    });
  }

  /**
   * Returns menu for save
   */
  prepareZone(): Zone {
    const controls = this.zoneForm.controls;
    const _zone = new Zone();
    _zone.id = this.zoneItem.id;
    _zone.name = controls.name.value;
    _zone.code = controls.code.value ? controls.code.value : '';
    _zone.isDeleted = this.zoneItem.isDeleted;
    return _zone;
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
    return this.zoneItem && this.zoneItem.name && this.zoneItem.name.length > 0;
  }

  /**
   * Save data
   */
  onSubmit() {
    this.hasFormErrors = false;
    const controls = this.zoneForm.controls;
    /** check form */
    if (this.zoneForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAsTouched());

      this.hasFormErrors = true;
      this.selectedTab = 0;
      return;
    }

    const editedZone = this.prepareZone();
    this.createOrUpdateZone(editedZone);
  }

  /**
   * Create or update menu
   *
   * @param _menu: Menu
   */
  createOrUpdateZone(zone: Zone) {
    if (!zone.id) {
      // menu.createdBy = this.currentUser.username ? this.currentUser.username : 'admin';
      zone.createdBy = 'admin';
      zone.isDeleted = false;
    }
    this.dataSource.createOrUpdateItem(zone);

    const createOrUpdateSubscription = this.dataSource.createOrUpdateSucess$.subscribe(res => {
      if (!res) {
        return;
      }

      const dialogData = zone.id > 0 ? { zone, isEdit: true } : { zone, isEdit: false };
      this.dialogRef.close(dialogData);
    });

    this.subscriptions.push(createOrUpdateSubscription);
  }
}
