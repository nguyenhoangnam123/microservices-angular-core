import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RolesPermissService } from 'app/entities/UserManagement/roles-permiss/roles-permiss.service';
import { IRolesPermiss, RolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';

describe('Service Tests', () => {
  describe('RolesPermiss Service', () => {
    let injector: TestBed;
    let service: RolesPermissService;
    let httpMock: HttpTestingController;
    let elemDefault: IRolesPermiss;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(RolesPermissService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RolesPermiss(0, 0, currentDate, currentDate, 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a RolesPermiss', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateUpdated: currentDate
          },
          returnedFromService
        );
        service
          .create(new RolesPermiss(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a RolesPermiss', () => {
        const returnedFromService = Object.assign(
          {
            value: 1,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT),
            createdBy: 'BBBBBB',
            updatedBy: 'BBBBBB',
            isDeleted: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateUpdated: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of RolesPermiss', () => {
        const returnedFromService = Object.assign(
          {
            value: 1,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT),
            createdBy: 'BBBBBB',
            updatedBy: 'BBBBBB',
            isDeleted: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateUpdated: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RolesPermiss', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
