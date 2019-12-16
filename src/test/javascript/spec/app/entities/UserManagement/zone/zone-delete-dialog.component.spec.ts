import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EGpTestModule } from '../../../../test.module';
import { ZoneDeleteDialogComponent } from 'app/entities/UserManagement/zone/zone-delete-dialog.component';
import { ZoneService } from 'app/entities/UserManagement/zone/zone.service';

describe('Component Tests', () => {
  describe('Zone Management Delete Component', () => {
    let comp: ZoneDeleteDialogComponent;
    let fixture: ComponentFixture<ZoneDeleteDialogComponent>;
    let service: ZoneService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [ZoneDeleteDialogComponent]
      })
        .overrideTemplate(ZoneDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ZoneDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZoneService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
