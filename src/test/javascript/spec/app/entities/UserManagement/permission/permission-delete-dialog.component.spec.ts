import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EGpTestModule } from '../../../../test.module';
import { PermissionDeleteDialogComponent } from 'app/entities/UserManagement/permission/permission-delete-dialog.component';
import { PermissionService } from 'app/entities/UserManagement/permission/permission.service';

describe('Component Tests', () => {
  describe('Permission Management Delete Component', () => {
    let comp: PermissionDeleteDialogComponent;
    let fixture: ComponentFixture<PermissionDeleteDialogComponent>;
    let service: PermissionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [PermissionDeleteDialogComponent]
      })
        .overrideTemplate(PermissionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PermissionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermissionService);
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
