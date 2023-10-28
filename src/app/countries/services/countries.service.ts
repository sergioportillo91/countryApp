import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },

  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStore()
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStore() {

    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

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

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: query, countries: countries }),
        tap(() => this.saveToLocalStorage())
      )
  }

  public searchRegion(query: Region): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${query}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region: query, countries: countries }),
        tap(() => this.saveToLocalStorage())
      )
  }

  public searchCountry(query: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${query}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term: query, countries: countries }),
        tap(() => this.saveToLocalStorage())
      )
  }

}
