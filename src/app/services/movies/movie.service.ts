import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Movie} from '../../models/movie';
import {environment} from '../../../environments/environment';
import {Crud} from '../../models/crud';
import {DeleteResponse} from '../../models/delete-response';
import {GetMovieFilter} from '../../models/get-movie-filter';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements Crud<Movie, DeleteResponse, GetMovieFilter> {
  private baseURL = environment.base_url + 'api/movies';

  constructor(private http: HttpClient) {
  }

  get({limit = 30, page = 0}: GetMovieFilter): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseURL + '?limit=' + limit + '&page=' + page);
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.baseURL, movie);
  }

  update(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.baseURL + '/' + movie.id, movie);
  }

  delete(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(this.baseURL + '/' + id);
  }

}
