import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MoviesComponent} from './components/movies/movies.component';
import {AddMovieComponent} from './components/add-movie/add-movie.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'movies', pathMatch: 'full'
  },
  {
    path: 'movies',
    children: [
      {
        path: '',
        component: MoviesComponent,
      },
      {
        path: 'add',
        component: AddMovieComponent
      }
    ]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
