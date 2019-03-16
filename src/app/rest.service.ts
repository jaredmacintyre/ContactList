import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { JokeResponse } from './rest';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiUrl = 'https://official-joke-api.appspot.com/random_joke';

  constructor(private http: HttpClient) { }

  sendRequest() {
    console.log(this.apiUrl)
    return this.http.get<JokeResponse>(this.apiUrl)
      .pipe(map(res => res)
    );
  }
}