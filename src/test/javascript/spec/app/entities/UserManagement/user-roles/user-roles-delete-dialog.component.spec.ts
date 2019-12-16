import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EGpTestModule } from '../../../../test.module';
import { UserRolesDeleteDialogComponent } from 'app/entities/UserManagement/user-roles/user-roles-delete-dialog.component';
import { UserRolesService } from 'app/entities/UserManagement/user-roles/user-roles.service';

describe('Component Tests', () => {
  describe('UserRoles Management Delete Component', () => {
    let comp: UserRolesDeleteDialogComponent;
    let fixture: ComponentFixture<UserRolesDeleteDialogComponent>;
    let service: UserRolesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [UserRolesDeleteDialogComponent]
      })
        .overrideTemplate(UserRolesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRolesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRolesService);
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
