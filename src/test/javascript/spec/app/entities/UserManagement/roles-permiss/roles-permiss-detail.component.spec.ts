import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { RolesPermissDetailComponent } from 'app/entities/UserManagement/roles-permiss/roles-permiss-detail.component';
import { RolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';

describe('Component Tests', () => {
  describe('RolesPermiss Management Detail Component', () => {
    let comp: RolesPermissDetailComponent;
    let fixture: ComponentFixture<RolesPermissDetailComponent>;
    const route = ({ data: of({ rolesPermiss: new RolesPermiss(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [RolesPermissDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RolesPermissDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RolesPermissDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rolesPermiss).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
