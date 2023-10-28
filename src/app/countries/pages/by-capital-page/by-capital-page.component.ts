import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private service: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.service.cacheStore.byCapital.countries;
    this.initialValue = this.service.cacheStore.byCapital.term;
  }

  public searchByCapital(search: string): void {

    this.isLoading = true;

    this.service.searchCapital(search).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
