import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EGpTestModule } from '../../../../test.module';
import { MenuZoneDeleteDialogComponent } from 'app/entities/UserManagement/menu-zone/menu-zone-delete-dialog.component';
import { MenuZoneService } from 'app/entities/UserManagement/menu-zone/menu-zone.service';

describe('Component Tests', () => {
  describe('MenuZone Management Delete Component', () => {
    let comp: MenuZoneDeleteDialogComponent;
    let fixture: ComponentFixture<MenuZoneDeleteDialogComponent>;
    let service: MenuZoneService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [MenuZoneDeleteDialogComponent]
      })
        .overrideTemplate(MenuZoneDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuZoneDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuZoneService);
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
