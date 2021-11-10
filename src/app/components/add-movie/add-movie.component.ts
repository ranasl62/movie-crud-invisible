import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/movie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  @Output() onAddMovie: EventEmitter<Movie> = new EventEmitter();
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();
  title: string;
  originalTitle: string;
  budget = 0;
  movieForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly notifierService: NotifierService) {
  }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      budget: ['', Validators.min(0)],
      originalLang: [],
      originalTitle: [],
      overview: [],
      popularity: [],
      releaseDate: [],
      revenue: [],
      runtime: [],
      status: [],
      tagline: [],
      voteAverage: [],
      voteCount: [],
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.notifierService.notify('error', 'please fill-up the all * marks fields ans also provide a valid data', '12');
      return ;
    }
    this.onAddMovie.emit(this.movieForm.value);
  }

  onCancel() {
  this.onCloseModal.emit(false);
  }
}
