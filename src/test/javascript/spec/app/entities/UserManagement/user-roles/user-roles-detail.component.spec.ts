import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { UserRolesDetailComponent } from 'app/entities/UserManagement/user-roles/user-roles-detail.component';
import { UserRoles } from 'app/shared/model/UserManagement/user-roles.model';

describe('Component Tests', () => {
  describe('UserRoles Management Detail Component', () => {
    let comp: UserRolesDetailComponent;
    let fixture: ComponentFixture<UserRolesDetailComponent>;
    const route = ({ data: of({ userRoles: new UserRoles(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [UserRolesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserRolesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRolesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userRoles).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
