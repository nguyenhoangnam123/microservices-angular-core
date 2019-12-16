import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { MenuDetailComponent } from 'app/entities/UserManagement/menu/menu-detail.component';
import { Menu } from 'app/shared/model/UserManagement/menu.model';

describe('Component Tests', () => {
  describe('Menu Management Detail Component', () => {
    let comp: MenuDetailComponent;
    let fixture: ComponentFixture<MenuDetailComponent>;
    const route = ({ data: of({ menu: new Menu(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [MenuDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MenuDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MenuDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.menu).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
