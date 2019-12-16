import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';
import { MenuZoneService } from './menu-zone.service';

@Component({
  selector: 'jhi-menu-zone-delete-dialog',
  templateUrl: './menu-zone-delete-dialog.component.html'
})
export class MenuZoneDeleteDialogComponent {
  menuZone: IMenuZone;

  constructor(protected menuZoneService: MenuZoneService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.menuZoneService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'menuZoneListModification',
        content: 'Deleted an menuZone'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-menu-zone-delete-popup',
  template: ''
})
export class MenuZoneDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ menuZone }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MenuZoneDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.menuZone = menuZone;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/menu-zone', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/menu-zone', { outlets: { popup: null } }]);
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
