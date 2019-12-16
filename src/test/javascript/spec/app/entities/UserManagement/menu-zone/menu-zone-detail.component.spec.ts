import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { MenuZoneDetailComponent } from 'app/entities/UserManagement/menu-zone/menu-zone-detail.component';
import { MenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

describe('Component Tests', () => {
  describe('MenuZone Management Detail Component', () => {
    let comp: MenuZoneDetailComponent;
    let fixture: ComponentFixture<MenuZoneDetailComponent>;
    const route = ({ data: of({ menuZone: new MenuZone(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [MenuZoneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MenuZoneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuZoneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.menuZone).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
