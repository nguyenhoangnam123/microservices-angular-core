import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserRoles } from 'app/shared/model/UserManagement/user-roles.model';

@Component({
  selector: 'jhi-user-roles-detail',
  templateUrl: './user-roles-detail.component.html'
})
export class UserRolesDetailComponent implements OnInit {
  userRoles: IUserRoles;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userRoles }) => {
      this.userRoles = userRoles;
    });
  }

  previousState() {
    window.history.back();
  }
}
