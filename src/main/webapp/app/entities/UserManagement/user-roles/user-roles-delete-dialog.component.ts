import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserRoles } from 'app/shared/model/UserManagement/user-roles.model';
import { UserRolesService } from './user-roles.service';

@Component({
  selector: 'jhi-user-roles-delete-dialog',
  templateUrl: './user-roles-delete-dialog.component.html'
})
export class UserRolesDeleteDialogComponent {
  userRoles: IUserRoles;

  constructor(protected userRolesService: UserRolesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userRolesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userRolesListModification',
        content: 'Deleted an userRoles'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-roles-delete-popup',
  template: ''
})
export class UserRolesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userRoles }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserRolesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userRoles = userRoles;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-roles', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-roles', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
