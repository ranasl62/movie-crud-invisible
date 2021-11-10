import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {HotTableModule} from '@handsontable/angular';
import {AppComponent} from './app.component';
import {MoviesComponent} from './components/movies/movies.component';
import {AddMovieComponent} from './components/add-movie/add-movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 24
    },
    vertical: {
      position: 'bottom',
      distance: 24,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [AppComponent, MoviesComponent, AddMovieComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HotTableModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
