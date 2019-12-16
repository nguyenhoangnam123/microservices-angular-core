import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';

@Component({
  selector: 'jhi-roles-permiss-detail',
  templateUrl: './roles-permiss-detail.component.html'
})
export class RolesPermissDetailComponent implements OnInit {
  rolesPermiss: IRolesPermiss;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rolesPermiss }) => {
      this.rolesPermiss = rolesPermiss;
    });
  }

  previousState() {
    window.history.back();
  }
}
