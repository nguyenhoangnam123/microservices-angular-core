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
import { IPermission, Permission } from 'app/shared/model/UserManagement/permission.model';
import { PermissionService } from './permission.service';
import { IMenu } from 'app/shared/model/UserManagement/menu.model';
import { MenuService } from 'app/entities/UserManagement/menu/menu.service';
import { IOperation } from 'app/shared/model/UserManagement/operation.model';
import { OperationService } from 'app/entities/UserManagement/operation/operation.service';

@Component({
  selector: 'jhi-permission-update',
  templateUrl: './permission-update.component.html'
})
export class PermissionUpdateComponent implements OnInit {
  isSaving: boolean;

  menus: IMenu[];

  operations: IOperation[];

  editForm = this.fb.group({
    id: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: [],
    menu: [],
    operation: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected permissionService: PermissionService,
    protected menuService: MenuService,
    protected operationService: OperationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ permission }) => {
      this.updateForm(permission);
    });
    this.menuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenu[]>) => response.body)
      )
      .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.operationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOperation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOperation[]>) => response.body)
      )
      .subscribe((res: IOperation[]) => (this.operations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(permission: IPermission) {
    this.editForm.patchValue({
      id: permission.id,
      dateCreated: permission.dateCreated != null ? permission.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: permission.dateUpdated != null ? permission.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: permission.createdBy,
      updatedBy: permission.updatedBy,
      isDeleted: permission.isDeleted,
      menu: permission.menu,
      operation: permission.operation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const permission = this.createFromForm();
    if (permission.id !== undefined) {
      this.subscribeToSaveResponse(this.permissionService.update(permission));
    } else {
      this.subscribeToSaveResponse(this.permissionService.create(permission));
    }
  }

  private createFromForm(): IPermission {
    return {
      ...new Permission(),
      id: this.editForm.get(['id']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value,
      menu: this.editForm.get(['menu']).value,
      operation: this.editForm.get(['operation']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPermission>>) {
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

  trackMenuById(index: number, item: IMenu) {
    return item.id;
  }

  trackOperationById(index: number, item: IOperation) {
    return item.id;
  }
}
