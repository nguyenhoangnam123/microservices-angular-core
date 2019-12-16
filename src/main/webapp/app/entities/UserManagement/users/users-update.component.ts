import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IUsers, Users } from 'app/shared/model/UserManagement/users.model';
import { UsersService } from './users.service';

@Component({
  selector: 'jhi-users-update',
  templateUrl: './users-update.component.html'
})
export class UsersUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    organizationUnitId: [],
    email: [],
    passwordHash: [],
    securityStamp: [],
    phoneNumber: [],
    jobTitle: [],
    officeTel: [],
    userName: [],
    name: [],
    description: [],
    isActive: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: [],
    pictureId: [],
    isOnline: [],
    dateOnlineUpdated: [],
    dateOfflineUpdated: []
  });

  constructor(protected usersService: UsersService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ users }) => {
      this.updateForm(users);
    });
  }

  updateForm(users: IUsers) {
    this.editForm.patchValue({
      id: users.id,
      organizationUnitId: users.organizationUnitId,
      email: users.email,
      passwordHash: users.passwordHash,
      securityStamp: users.securityStamp,
      phoneNumber: users.phoneNumber,
      jobTitle: users.jobTitle,
      officeTel: users.officeTel,
      userName: users.userName,
      name: users.name,
      description: users.description,
      isActive: users.isActive,
      dateCreated: users.dateCreated != null ? users.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: users.dateUpdated != null ? users.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: users.createdBy,
      updatedBy: users.updatedBy,
      isDeleted: users.isDeleted,
      pictureId: users.pictureId,
      isOnline: users.isOnline,
      dateOnlineUpdated: users.dateOnlineUpdated != null ? users.dateOnlineUpdated.format(DATE_TIME_FORMAT) : null,
      dateOfflineUpdated: users.dateOfflineUpdated != null ? users.dateOfflineUpdated.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const users = this.createFromForm();
    if (users.id !== undefined) {
      this.subscribeToSaveResponse(this.usersService.update(users));
    } else {
      this.subscribeToSaveResponse(this.usersService.create(users));
    }
  }

  private createFromForm(): IUsers {
    return {
      ...new Users(),
      id: this.editForm.get(['id']).value,
      organizationUnitId: this.editForm.get(['organizationUnitId']).value,
      email: this.editForm.get(['email']).value,
      passwordHash: this.editForm.get(['passwordHash']).value,
      securityStamp: this.editForm.get(['securityStamp']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      jobTitle: this.editForm.get(['jobTitle']).value,
      officeTel: this.editForm.get(['officeTel']).value,
      userName: this.editForm.get(['userName']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      isActive: this.editForm.get(['isActive']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value,
      pictureId: this.editForm.get(['pictureId']).value,
      isOnline: this.editForm.get(['isOnline']).value,
      dateOnlineUpdated:
        this.editForm.get(['dateOnlineUpdated']).value != null
          ? moment(this.editForm.get(['dateOnlineUpdated']).value, DATE_TIME_FORMAT)
          : undefined,
      dateOfflineUpdated:
        this.editForm.get(['dateOfflineUpdated']).value != null
          ? moment(this.editForm.get(['dateOfflineUpdated']).value, DATE_TIME_FORMAT)
          : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsers>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
