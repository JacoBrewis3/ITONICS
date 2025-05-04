import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private url = '/json/europe_population_enriched.json'

  constructor(private httpClient: HttpClient) { }

  fetchData(): Observable<any> {
    return this.httpClient.get(this.url);
  }
}
