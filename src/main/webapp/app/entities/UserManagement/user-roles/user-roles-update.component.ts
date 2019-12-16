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
import { IUserRoles, UserRoles } from 'app/shared/model/UserManagement/user-roles.model';
import { UserRolesService } from './user-roles.service';
import { IUsers } from 'app/shared/model/UserManagement/users.model';
import { UsersService } from 'app/entities/UserManagement/users/users.service';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';
import { RolesService } from 'app/entities/UserManagement/roles/roles.service';

@Component({
  selector: 'jhi-user-roles-update',
  templateUrl: './user-roles-update.component.html'
})
export class UserRolesUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUsers[];

  roles: IRoles[];

  editForm = this.fb.group({
    id: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: [],
    users: [],
    roles: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userRolesService: UserRolesService,
    protected usersService: UsersService,
    protected rolesService: RolesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userRoles }) => {
      this.updateForm(userRoles);
    });
    this.usersService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUsers[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUsers[]>) => response.body)
      )
      .subscribe((res: IUsers[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.rolesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRoles[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRoles[]>) => response.body)
      )
      .subscribe((res: IRoles[]) => (this.roles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userRoles: IUserRoles) {
    this.editForm.patchValue({
      id: userRoles.id,
      dateCreated: userRoles.dateCreated != null ? userRoles.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: userRoles.dateUpdated != null ? userRoles.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: userRoles.createdBy,
      updatedBy: userRoles.updatedBy,
      isDeleted: userRoles.isDeleted,
      users: userRoles.users,
      roles: userRoles.roles
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userRoles = this.createFromForm();
    if (userRoles.id !== undefined) {
      this.subscribeToSaveResponse(this.userRolesService.update(userRoles));
    } else {
      this.subscribeToSaveResponse(this.userRolesService.create(userRoles));
    }
  }

  private createFromForm(): IUserRoles {
    return {
      ...new UserRoles(),
      id: this.editForm.get(['id']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value,
      users: this.editForm.get(['users']).value,
      roles: this.editForm.get(['roles']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserRoles>>) {
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

  trackUsersById(index: number, item: IUsers) {
    return item.id;
  }

  trackRolesById(index: number, item: IRoles) {
    return item.id;
  }
}
