import { Injectable } from '@angular/core';
import {LocalstorageService} from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class HansonTableService {

  constructor(private readonly localStorage: LocalstorageService) {
  }

  cMove(movedColumns: number[], finalIndex: number): void {
    if (this.localStorage.getItem('colWidths')) {
      const colWidths = this.localStorage.json_decode(this.localStorage.getItem('colWidths'));
      [colWidths[movedColumns[0]], colWidths[finalIndex]] = [colWidths[finalIndex], colWidths[movedColumns[0]]];
      this.localStorage.setItem('colWidths', this.localStorage.json_encode(colWidths));
    }

    if (this.localStorage.getItem('columns')) {
      const columns = this.localStorage.json_decode(this.localStorage.getItem('columns'));
      [columns[movedColumns[0]], columns[finalIndex]] = [columns[finalIndex], columns[movedColumns[0]]];
      this.localStorage.setItem('columns', this.localStorage.json_encode(columns));
    }

    if (this.localStorage.getItem('columnsHeaders')) {
      const columns = this.localStorage.json_decode(this.localStorage.getItem('columnsHeaders'));
      [columns[movedColumns[0]], columns[finalIndex]] = [columns[finalIndex], columns[movedColumns[0]]];
      this.localStorage.setItem('columnsHeaders', this.localStorage.json_encode(columns));
    }
  }

}
