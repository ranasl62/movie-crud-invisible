import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movies/movie.service';
import {Movie} from '../../models/movie';
import {LocalstorageService} from '../../services/localstorage/localstorage.service';
import {NotifierService} from 'angular-notifier';
import {HansonTableService} from '../../services/tables/hanson-table.service';

let that: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  dataset: Movie[] = [];
  colWidths = [90, 336, 289, 123, 163, 165];
  columnsHeaders = ['ID', 'Title', 'Original Title', 'Status', 'Budget', 'Popularity', 'Activity'];
  columns = [
    {
      data: 'id'
    }, {
      data: 'title'
    }, {
      data: 'originalTitle'
    }, {
      data: 'status'
    }, {
      data: 'budget'
    }, {
      data: 'popularity'
    }
  ];

  currentPage = 1;
  isSaveMode = false;
  constructor(private readonly movieService: MovieService,
              private readonly localStorage: LocalstorageService,
              private readonly notifierService: NotifierService,
              private  hansonTableService: HansonTableService) {
    that = this;
  }

  ngOnInit(): void {
    this.getMovies();
  }

  afterChange = (changes, src) => {
    if (src === 'edit' && changes[0][1] === 'id' && !changes[0][3]) {
      this.deleteMovie(changes[0][2]);
      this.dataset.splice(changes[0][0], 1);
    } else if (src === 'edit') {
      const existingMovie = this.dataset[changes[0][0]];
      existingMovie[changes[0][1]] = changes[0][3];
      this.updateMovie(existingMovie as Movie);
    }
  }

  afterColumnResize(newSize: number, column: number): void {
    let colWidths: any = that.localStorage.getItem('colWidths');
    if (colWidths) {
      colWidths = that.localStorage.json_decode(colWidths);
      colWidths[column] = newSize;
      that.localStorage.setItem('colWidths', that.localStorage.json_encode(colWidths));
    }
  }

  columnMove(movedColumns: number[], finalIndex: number): void {
    that.hansonTableService.cMove(movedColumns, finalIndex);
  }

  getHTItem(key: string, value: any): any[] {
    return this.localStorage.getOrSetItem(key, value);
  }

  createMovie(movie: Movie): void {
    this.movieService.create(movie as Movie).subscribe(data => {
      this.notifierService.notify('success', 'Movie created successfully!');
      this.dataset.push(data);
      this.isSaveMode = false;
    }, error => {
      this.notifierService.notify('error', 'Movie created failed!');
      this.isSaveMode = true;
    });
  }

  updateMovie(movie: Movie): void {
    this.movieService.update(movie as Movie).subscribe((res) => {
      this.notifierService.notify('success', 'Movie updated successfully!');
    }, error => {
      this.notifierService.notify('error', 'Movie update failed!');
    });
  }

  deleteMovie(id: number): void {
    this.movieService.delete(id).subscribe((res) => {
      this.notifierService.notify('success', res?.message || 'Movie deleted successfully!');
    }, error => {
      this.notifierService.notify('error', 'Movie delete failed!');
    });
  }

  pageChanged(page: number) {
    this.currentPage += page;
    this.getMovies(this.currentPage);
  }

  getMovies(page = 0) {
    this.movieService.get({page}).subscribe(data => {
      this.dataset = data;
    }, error => {
      this.notifierService.notify('error', 'Movie service failed! please be patient');
    });
  }

  modalClose($event: boolean) {
    this.isSaveMode = $event;
    this.notifierService.notify('error', 'Movie adding cancel');
  }

  movieAdd($event: Movie) {
   if ($event.releaseDate) {
     $event.releaseDate = new Date($event.releaseDate).toISOString();
   }
   this.createMovie($event);
  }
}
