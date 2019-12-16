import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IZone } from 'app/shared/model/UserManagement/zone.model';
import { ZoneService } from './zone.service';

@Component({
  selector: 'jhi-zone-delete-dialog',
  templateUrl: './zone-delete-dialog.component.html'
})
export class ZoneDeleteDialogComponent {
  zone: IZone;

  constructor(protected zoneService: ZoneService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.zoneService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'zoneListModification',
        content: 'Deleted an zone'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-zone-delete-popup',
  template: ''
})
export class ZoneDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ zone }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ZoneDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.zone = zone;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/zone', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/zone', { outlets: { popup: null } }]);
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
