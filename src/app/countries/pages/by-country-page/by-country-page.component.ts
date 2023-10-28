import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {


  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor(private service: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.service.cacheStore.byCountries.countries;
    this.initialValue = this.service.cacheStore.byCountries.term;
  }

  public searchByCountry(search: string): void {

    this.isLoading = true;

    this.service.searchCountry(search).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
