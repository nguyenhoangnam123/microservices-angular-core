import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { RolesPermissUpdateComponent } from 'app/entities/UserManagement/roles-permiss/roles-permiss-update.component';
import { RolesPermissService } from 'app/entities/UserManagement/roles-permiss/roles-permiss.service';
import { RolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';

describe('Component Tests', () => {
  describe('RolesPermiss Management Update Component', () => {
    let comp: RolesPermissUpdateComponent;
    let fixture: ComponentFixture<RolesPermissUpdateComponent>;
    let service: RolesPermissService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [RolesPermissUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RolesPermissUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolesPermissUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolesPermissService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RolesPermiss(123);
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
        const entity = new RolesPermiss();
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
