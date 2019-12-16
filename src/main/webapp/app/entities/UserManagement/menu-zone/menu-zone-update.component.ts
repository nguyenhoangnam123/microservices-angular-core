import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMenuZone, MenuZone } from 'app/shared/model/UserManagement/menu-zone.model';
import { MenuZoneService } from './menu-zone.service';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';
import { RolesService } from 'app/entities/UserManagement/roles/roles.service';
import { IMenu } from 'app/shared/model/UserManagement/menu.model';
import { MenuService } from 'app/entities/UserManagement/menu/menu.service';
import { IZone } from 'app/shared/model/UserManagement/zone.model';
import { ZoneService } from 'app/entities/UserManagement/zone/zone.service';

@Component({
  selector: 'jhi-menu-zone-update',
  templateUrl: './menu-zone-update.component.html'
})
export class MenuZoneUpdateComponent implements OnInit {
  isSaving: boolean;

  roles: IRoles[];

  menus: IMenu[];

  zones: IZone[];

  editForm = this.fb.group({
    id: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: [],
    roles: [],
    menu: [],
    zone: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected menuZoneService: MenuZoneService,
    protected rolesService: RolesService,
    protected menuService: MenuService,
    protected zoneService: ZoneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ menuZone }) => {
      this.updateForm(menuZone);
    });
    this.rolesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoles[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoles[]>) => response.body)
      )
      .subscribe((res: IRoles[]) => (this.roles = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.menuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenu[]>) => response.body)
      )
      .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.zoneService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IZone[]>) => mayBeOk.ok),
        map((response: HttpResponse<IZone[]>) => response.body)
      )
      .subscribe((res: IZone[]) => (this.zones = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(menuZone: IMenuZone) {
    this.editForm.patchValue({
      id: menuZone.id,
      dateCreated: menuZone.dateCreated != null ? menuZone.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: menuZone.dateUpdated != null ? menuZone.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: menuZone.createdBy,
      updatedBy: menuZone.updatedBy,
      isDeleted: menuZone.isDeleted,
      roles: menuZone.roles,
      menu: menuZone.menu,
      zone: menuZone.zone
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const menuZone = this.createFromForm();
    if (menuZone.id !== undefined) {
      this.subscribeToSaveResponse(this.menuZoneService.update(menuZone));
    } else {
      this.subscribeToSaveResponse(this.menuZoneService.create(menuZone));
    }
  }

  private createFromForm(): IMenuZone {
    return {
      ...new MenuZone(),
      id: this.editForm.get(['id']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value,
      roles: this.editForm.get(['roles']).value,
      menu: this.editForm.get(['menu']).value,
      zone: this.editForm.get(['zone']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenuZone>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRolesById(index: number, item: IRoles) {
    return item.id;
  }

  trackMenuById(index: number, item: IMenu) {
    return item.id;
  }

  trackZoneById(index: number, item: IZone) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
