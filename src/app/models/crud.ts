import {Observable} from 'rxjs';

export interface Crud<T, D, F> {
  data?: T;
  create: (value: T) => Observable<T>;
  update: (value: T) => Observable<T>;
  delete: (id: number) => Observable<D>;
  get: (filter: F) => Observable<T[]>;
}
