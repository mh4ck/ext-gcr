import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private API_LOCATION: string = 'https://service.emailtelus.com';
  private API_KEY: string = 'a8w9dzahAa8d';

  constructor(private http: HttpClient) {}

  public defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public buildUrl(url: string): string {
    if (url.indexOf('http') === -1) {
      url = `${this.API_LOCATION}${url}`;
    }

    if (url.indexOf('api_key=') !== -1) {
      return url;
    }

    if (url.indexOf('?') !== -1) {
      return `${url}&api_key=${this.API_KEY}`;
    }

    return `${url}?api_key=${this.API_KEY}`;
  }

  getJSON(url: string): Observable<any> {
    url = this.buildUrl(url);
    return this.http
      .get(url, {
        headers: this.defaultHeaders,
      })
      .pipe(
        tap((_) => {}),
        catchError(this.handleError<any>('get'))
      );
  }

  getText(url: string): Observable<any> {
    url = this.buildUrl(url);
    return this.http
      .get(url, {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain' }),
      })
      .pipe(
        tap((_) => {}),
        catchError(this.handleError<any>('get'))
      );
  }

  post(url: string, data: any, options: any): Observable<any> {
    url = this.buildUrl(url);

    if (options == null) {
      options = {
        headers: this.defaultHeaders,
      };
    }

    return this.http.post(url, data, options).pipe(
      tap((_) => {}),
      catchError(this.handleError<any>('post'))
    );
  }

  upload(files: any): Observable<any> {
    let url = this.buildUrl('/upload');
    let formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    return this.http.post(`${url}`, formData).pipe(
      tap((_) => {}),
      catchError(this.handleError<any>('post'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
