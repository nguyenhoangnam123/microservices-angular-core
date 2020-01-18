import { BaseDataSource, QueryParamsModel, QueryResultsModel } from 'app/core/_base/crud';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ZoneService } from './zone.service';
import { tap, catchError, finalize } from 'rxjs/operators';

export class ZoneDataSource extends BaseDataSource {
  // Loading | Progress bar
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;
  constructor(private zoneService: ZoneService) {
    super();
    this.loading$ = this.loadingSubject.asObservable();
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
}
