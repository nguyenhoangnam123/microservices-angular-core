import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EGpTestModule } from '../../../../test.module';
import { ZoneDetailComponent } from 'app/entities/UserManagement/zone/zone-detail.component';
import { Zone } from 'app/shared/model/UserManagement/zone.model';

describe('Component Tests', () => {
  describe('Zone Management Detail Component', () => {
    let comp: ZoneDetailComponent;
    let fixture: ComponentFixture<ZoneDetailComponent>;
    const route = ({ data: of({ zone: new Zone(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EGpTestModule],
        declarations: [ZoneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ZoneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ZoneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.zone).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
