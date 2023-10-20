import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {


  public countries: Country[] = [];

  constructor(private service: CountriesService) { }

  public searchByCountry(search: string): void {
    this.service.searchCountry(search).subscribe(countries => {
      this.countries = countries;
    });
  }

}