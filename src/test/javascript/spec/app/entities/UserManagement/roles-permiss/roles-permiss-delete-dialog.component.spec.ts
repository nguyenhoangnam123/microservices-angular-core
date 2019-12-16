import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EGpTestModule } from '../../../../test.module';
import { RolesPermissDeleteDialogComponent } from 'app/entities/UserManagement/roles-permiss/roles-permiss-delete-dialog.component';
import { RolesPermissService } from 'app/entities/UserManagement/roles-permiss/roles-permiss.service';

describe('Component Tests', () => {
  describe('RolesPermiss Management Delete Component', () => {
    let comp: RolesPermissDeleteDialogComponent;
    let fixture: ComponentFixture<RolesPermissDeleteDialogComponent>;
    let service: RolesPermissService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [RolesPermissDeleteDialogComponent]
      })
        .overrideTemplate(RolesPermissDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RolesPermissDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolesPermissService);
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
