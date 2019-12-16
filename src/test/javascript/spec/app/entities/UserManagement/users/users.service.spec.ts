import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UsersService } from 'app/entities/UserManagement/users/users.service';
import { IUsers, Users } from 'app/shared/model/UserManagement/users.model';

describe('Service Tests', () => {
  describe('Users Service', () => {
    let injector: TestBed;
    let service: UsersService;
    let httpMock: HttpTestingController;
    let elemDefault: IUsers;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(UsersService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Users(
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        false,
        0,
        false,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT),
            dateOnlineUpdated: currentDate.format(DATE_TIME_FORMAT),
            dateOfflineUpdated: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a Users', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT),
            dateOnlineUpdated: currentDate.format(DATE_TIME_FORMAT),
            dateOfflineUpdated: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateUpdated: currentDate,
            dateOnlineUpdated: currentDate,
            dateOfflineUpdated: currentDate
          },
          returnedFromService
        );
        service
          .create(new Users(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Users', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitId: 1,
            email: 'BBBBBB',
            passwordHash: 'BBBBBB',
            securityStamp: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            jobTitle: 'BBBBBB',
            officeTel: 'BBBBBB',
            userName: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            isActive: true,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT),
            createdBy: 'BBBBBB',
            updatedBy: 'BBBBBB',
            isDeleted: true,
            pictureId: 1,
            isOnline: true,
            dateOnlineUpdated: currentDate.format(DATE_TIME_FORMAT),
            dateOfflineUpdated: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateUpdated: currentDate,
            dateOnlineUpdated: currentDate,
            dateOfflineUpdated: currentDate
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

      it('should return a list of Users', () => {
        const returnedFromService = Object.assign(
          {
            organizationUnitId: 1,
            email: 'BBBBBB',
            passwordHash: 'BBBBBB',
            securityStamp: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            jobTitle: 'BBBBBB',
            officeTel: 'BBBBBB',
            userName: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            isActive: true,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateUpdated: currentDate.format(DATE_TIME_FORMAT),
            createdBy: 'BBBBBB',
            updatedBy: 'BBBBBB',
            isDeleted: true,
            pictureId: 1,
            isOnline: true,
            dateOnlineUpdated: currentDate.format(DATE_TIME_FORMAT),
            dateOfflineUpdated: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateUpdated: currentDate,
            dateOnlineUpdated: currentDate,
            dateOfflineUpdated: currentDate
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

      it('should delete a Users', () => {
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
