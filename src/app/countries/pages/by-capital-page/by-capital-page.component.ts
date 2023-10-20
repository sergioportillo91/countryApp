import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private service: CountriesService) { }

  public searchByCapital(search: string): void {

    this.isLoading = true;

    this.service.searchCapital(search).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
