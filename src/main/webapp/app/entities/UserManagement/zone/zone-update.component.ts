import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IZone, Zone } from 'app/shared/model/UserManagement/zone.model';
import { ZoneService } from './zone.service';

@Component({
  selector: 'jhi-zone-update',
  templateUrl: './zone-update.component.html'
})
export class ZoneUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    dateCreated: [],
    dateUpdated: [],
    createdBy: [],
    updatedBy: [],
    isDeleted: []
  });

  constructor(protected zoneService: ZoneService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ zone }) => {
      this.updateForm(zone);
    });
  }

  updateForm(zone: IZone) {
    this.editForm.patchValue({
      id: zone.id,
      code: zone.code,
      name: zone.name,
      dateCreated: zone.dateCreated != null ? zone.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: zone.dateUpdated != null ? zone.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: zone.createdBy,
      updatedBy: zone.updatedBy,
      isDeleted: zone.isDeleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const zone = this.createFromForm();
    if (zone.id !== undefined) {
      this.subscribeToSaveResponse(this.zoneService.update(zone));
    } else {
      this.subscribeToSaveResponse(this.zoneService.create(zone));
    }
  }

  private createFromForm(): IZone {
    return {
      ...new Zone(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      name: this.editForm.get(['name']).value,
      dateCreated:
        this.editForm.get(['dateCreated']).value != null ? moment(this.editForm.get(['dateCreated']).value, DATE_TIME_FORMAT) : undefined,
      dateUpdated:
        this.editForm.get(['dateUpdated']).value != null ? moment(this.editForm.get(['dateUpdated']).value, DATE_TIME_FORMAT) : undefined,
      createdBy: this.editForm.get(['createdBy']).value,
      updatedBy: this.editForm.get(['updatedBy']).value,
      isDeleted: this.editForm.get(['isDeleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZone>>) {
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
