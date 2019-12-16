import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOperation, Operation } from 'app/shared/model/UserManagement/operation.model';
import { OperationService } from './operation.service';

@Component({
  selector: 'jhi-operation-update',
  templateUrl: './operation-update.component.html'
})
export class OperationUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    description: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: []
  });

  constructor(protected operationService: OperationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ operation }) => {
      this.updateForm(operation);
    });
  }

  updateForm(operation: IOperation) {
    this.editForm.patchValue({
      id: operation.id,
      code: operation.code,
      name: operation.name,
      description: operation.description,
      dateCreated: operation.dateCreated != null ? operation.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: operation.dateUpdated != null ? operation.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: operation.createdBy,
      updatedBy: operation.updatedBy,
      isDeleted: operation.isDeleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const operation = this.createFromForm();
    if (operation.id !== undefined) {
      this.subscribeToSaveResponse(this.operationService.update(operation));
    } else {
      this.subscribeToSaveResponse(this.operationService.create(operation));
    }
  }

  private createFromForm(): IOperation {
    return {
      ...new Operation(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperation>>) {
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
