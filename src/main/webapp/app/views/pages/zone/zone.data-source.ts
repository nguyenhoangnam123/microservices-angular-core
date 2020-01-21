import { BaseDataSource, QueryParamsModel, QueryResultsModel } from 'app/core/_base/crud';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ZoneService } from './zone.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Zone } from './zone.model';

export class ZoneDataSource extends BaseDataSource {
  // Loading | Progress bar
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;
  private _createOrUpdateSuccess$ = new Subject<boolean>();
  private _deleteSuccess$ = new Subject<boolean>();
  constructor(private zoneService: ZoneService) {
    super();
    this.loading$ = this.loadingSubject.asObservable();
  }
  get deleteSuccess$() {
    return this._deleteSuccess$;
  }

  get createOrUpdateSucess$() {
    return this._createOrUpdateSuccess$;
  }
  loadItems(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.zoneService
      .getAllItems()
      .pipe(
        tap(res => {
          const result = this.baseFilter(res, queryParams);
          this.entitySubject.next(result.items);
          this.paginatorTotalSubject.next(result.totalCount);
        }),
        catchError(err => of(new QueryResultsModel([], err))),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  createOrUpdateItem(zone: Zone) {
    this.loadingSubject.next(true);
    this.zoneService
      .createOrUpdateItem(zone)
      .pipe(
        tap(() => {
          this._createOrUpdateSuccess$.next(true);
        }),
        catchError(err => of(new QueryResultsModel([], err))),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
}
