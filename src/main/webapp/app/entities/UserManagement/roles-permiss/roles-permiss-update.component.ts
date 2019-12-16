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
import { IRolesPermiss, RolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';
import { RolesPermissService } from './roles-permiss.service';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';
import { RolesService } from 'app/entities/UserManagement/roles/roles.service';
import { IPermission } from 'app/shared/model/UserManagement/permission.model';
import { PermissionService } from 'app/entities/UserManagement/permission/permission.service';

@Component({
  selector: 'jhi-roles-permiss-update',
  templateUrl: './roles-permiss-update.component.html'
})
export class RolesPermissUpdateComponent implements OnInit {
  isSaving: boolean;

  roles: IRoles[];

  permissions: IPermission[];

  editForm = this.fb.group({
    id: [],
    value: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: [],
    roles: [],
    permission: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rolesPermissService: RolesPermissService,
    protected rolesService: RolesService,
    protected permissionService: PermissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rolesPermiss }) => {
      this.updateForm(rolesPermiss);
    });
    this.rolesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoles[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoles[]>) => response.body)
      )
      .subscribe((res: IRoles[]) => (this.roles = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.permissionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPermission[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPermission[]>) => response.body)
      )
      .subscribe((res: IPermission[]) => (this.permissions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rolesPermiss: IRolesPermiss) {
    this.editForm.patchValue({
      id: rolesPermiss.id,
      value: rolesPermiss.value,
      dateCreated: rolesPermiss.dateCreated != null ? rolesPermiss.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: rolesPermiss.dateUpdated != null ? rolesPermiss.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: rolesPermiss.createdBy,
      updatedBy: rolesPermiss.updatedBy,
      isDeleted: rolesPermiss.isDeleted,
      roles: rolesPermiss.roles,
      permission: rolesPermiss.permission
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rolesPermiss = this.createFromForm();
    if (rolesPermiss.id !== undefined) {
      this.subscribeToSaveResponse(this.rolesPermissService.update(rolesPermiss));
    } else {
      this.subscribeToSaveResponse(this.rolesPermissService.create(rolesPermiss));
    }
  }

  private createFromForm(): IRolesPermiss {
    return {
      ...new RolesPermiss(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value,
      roles: this.editForm.get(['roles']).value,
      permission: this.editForm.get(['permission']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRolesPermiss>>) {
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

  trackPermissionById(index: number, item: IPermission) {
    return item.id;
  }
}
