import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        delay(2000)
      );
  }

  public searchCountryByalphaCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(error => {
        return of(null)
      }));
  }

  public searchCapital(query: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${query}`;

    return this.getCountriesRequest(url);
  }

  public searchRegion(query: string): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${query}`;

    return this.getCountriesRequest(url);
  }

  public searchCountry(query: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${query}`;

    return this.getCountriesRequest(url);
  }

}
