import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';
import { RolesPermissService } from './roles-permiss.service';

@Component({
  selector: 'jhi-roles-permiss-delete-dialog',
  templateUrl: './roles-permiss-delete-dialog.component.html'
})
export class RolesPermissDeleteDialogComponent {
  rolesPermiss: IRolesPermiss;

  constructor(
    protected rolesPermissService: RolesPermissService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rolesPermissService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'rolesPermissListModification',
        content: 'Deleted an rolesPermiss'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-roles-permiss-delete-popup',
  template: ''
})
export class RolesPermissDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rolesPermiss }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RolesPermissDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rolesPermiss = rolesPermiss;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/roles-permiss', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/roles-permiss', { outlets: { popup: null } }]);
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
