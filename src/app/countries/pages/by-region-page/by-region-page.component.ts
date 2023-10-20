import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  public isLoading: boolean = false;

  constructor(private service: CountriesService) { }

  public searchByRegion(search: string): void {

    this.isLoading = true;

    this.service.searchRegion(search).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
