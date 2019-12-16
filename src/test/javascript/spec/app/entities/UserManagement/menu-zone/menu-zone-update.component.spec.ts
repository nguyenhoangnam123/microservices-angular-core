import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { MenuZoneUpdateComponent } from 'app/entities/UserManagement/menu-zone/menu-zone-update.component';
import { MenuZoneService } from 'app/entities/UserManagement/menu-zone/menu-zone.service';
import { MenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

describe('Component Tests', () => {
  describe('MenuZone Management Update Component', () => {
    let comp: MenuZoneUpdateComponent;
    let fixture: ComponentFixture<MenuZoneUpdateComponent>;
    let service: MenuZoneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [MenuZoneUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MenuZoneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MenuZoneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MenuZoneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MenuZone(123);
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
        const entity = new MenuZone();
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
