import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IMenu, Menu } from 'app/shared/model/UserManagement/menu.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'jhi-menu-update',
  templateUrl: './menu-update.component.html'
})
export class MenuUpdateComponent implements OnInit {
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

  constructor(protected menuService: MenuService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.updateForm(menu);
    });
  }

  updateForm(menu: IMenu) {
    this.editForm.patchValue({
      id: menu.id,
      code: menu.code,
      name: menu.name,
      description: menu.description,
      dateCreated: menu.dateCreated != null ? menu.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateUpdated: menu.dateUpdated != null ? menu.dateUpdated.format(DATE_TIME_FORMAT) : null,
      createdBy: menu.createdBy,
      updatedBy: menu.updatedBy,
      isDeleted: menu.isDeleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const menu = this.createFromForm();
    if (menu.id !== undefined) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  private createFromForm(): IMenu {
    return {
      ...new Menu(),
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenu>>) {
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
