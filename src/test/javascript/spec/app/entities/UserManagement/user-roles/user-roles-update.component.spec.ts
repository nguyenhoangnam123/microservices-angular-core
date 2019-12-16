import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { UserRolesUpdateComponent } from 'app/entities/UserManagement/user-roles/user-roles-update.component';
import { UserRolesService } from 'app/entities/UserManagement/user-roles/user-roles.service';
import { UserRoles } from 'app/shared/model/UserManagement/user-roles.model';

describe('Component Tests', () => {
  describe('UserRoles Management Update Component', () => {
    let comp: UserRolesUpdateComponent;
    let fixture: ComponentFixture<UserRolesUpdateComponent>;
    let service: UserRolesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [UserRolesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserRolesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRolesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRolesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRoles(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRoles();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
