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
import { IRoles, Roles } from 'app/shared/model/UserManagement/roles.model';
import { RolesService } from './roles.service';
import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';
import { MenuZoneService } from 'app/entities/UserManagement/menu-zone/menu-zone.service';

@Component({
  selector: 'jhi-roles-update',
  templateUrl: './roles-update.component.html'
})
export class RolesUpdateComponent implements OnInit {
  isSaving: boolean;

  menuzones: IMenuZone[];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    note: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: [],
    isActive: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rolesService: RolesService,
    protected menuZoneService: MenuZoneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ roles }) => {
      this.updateForm(roles);
    });
    this.menuZoneService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenuZone[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenuZone[]>) => response.body)
      )
      .subscribe((res: IMenuZone[]) => (this.menuzones = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(roles: IRoles) {
    this.editForm.patchValue({
      id: roles.id,
      code: roles.code,
      name: roles.name,
      note: roles.note,
      dateCreated: roles.dateCreated != null ? roles.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: roles.dateUpdated != null ? roles.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: roles.createdBy,
      updatedBy: roles.updatedBy,
      isDeleted: roles.isDeleted,
      isActive: roles.isActive
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const roles = this.createFromForm();
    if (roles.id !== undefined) {
      this.subscribeToSaveResponse(this.rolesService.update(roles));
    } else {
      this.subscribeToSaveResponse(this.rolesService.create(roles));
    }
  }

  private createFromForm(): IRoles {
    return {
      ...new Roles(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      name: this.editForm.get(['name']).value,
      note: this.editForm.get(['note']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value,
      isActive: this.editForm.get(['isActive']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoles>>) {
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

  trackMenuZoneById(index: number, item: IMenuZone) {
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
