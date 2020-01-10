// Angular
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
// CRUD
import { QueryParamsModel, QueryResultsModel, HttpExtenstionsModel } from '../../../core/_base/crud';
import { MenuItem, MenuService } from '../../../core/_base/layout';

export class MenuDataSource implements DataSource<MenuItem> {
  // Public properties
  entitySubject = new BehaviorSubject<any[]>([]);
  hasItems = false; // Need to show message: 'No records found

  // Loading | Progress bar
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject<number>(0);
  paginatorTotal$: Observable<number>;

  /**
   * Data-Source Constructor
   *
   * @param menuTableService: DataTableService
   */
  constructor(private menuService: MenuService) {
    this.loading$ = this.loadingSubject.asObservable();
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    this.paginatorTotal$.subscribe(res => (this.hasItems = res > 0));
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    // throw new Error('Method not implemented.');
    return this.entitySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    throw new Error('Method not implemented.');
  }

  loadItems(queryParams: QueryParamsModel) {
    this.loadingSubject.next(true);
    this.menuService
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

  baseFilter(_entities: any[], _queryParams: QueryParamsModel): QueryResultsModel {
    let entitiesResult = _entities;

    // Sorting
    // start
    if (_queryParams.sortField) {
      entitiesResult = this.sortArray(_entities, _queryParams.sortField, _queryParams.sortOrder);
    }
    // end

    // Paginator
    // start
    const totalCount = entitiesResult.length;
    const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
    entitiesResult = entitiesResult.slice(initialPos, initialPos + _queryParams.pageSize);
    // end

    const queryResults = new QueryResultsModel();
    queryResults.items = entitiesResult;
    queryResults.totalCount = totalCount;
    return queryResults;
  }

  sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
    const httpExtenstion = new HttpExtenstionsModel();
    return httpExtenstion.sortArray(_incomingArray, _sortField, _sortOrder);
  }
}
