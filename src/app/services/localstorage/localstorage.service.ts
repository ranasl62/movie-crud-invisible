import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  clear() {
    return localStorage.clear();
  }

  json_decode(value: string) {
    return JSON.parse(value);
  }

  json_encode(value: any) {
    return JSON.stringify(value);
  }

  getOrSetItem(key: string, value: any): any {
    if (!this.getItem(key)) {
      return this.setItem(key, this.json_encode(value));
    } else {
      return this.json_decode(this.getItem(key));
    }
  }

}
