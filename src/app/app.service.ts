import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from './models/result.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
    constructor(private http: HttpClient) {}

    url = "http://127.0.0.1:5000/";

    generate(text: string, predictions: number, tokens: number): Observable<Result> {
      return this.http.post<Result>(this.url + "predict", { "text": text, "predictions": predictions, "tokens": tokens });
    }

  }
