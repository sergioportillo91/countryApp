import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];

  public regions: Region[] = ['Africa', 'Americas', 'Europe', 'Asia', 'Oceania'];

  public selectedRegion?: Region;

  public isLoading: boolean = false;

  constructor(private service: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.service.cacheStore.byRegion.countries;
    this.selectedRegion = this.service.cacheStore.byRegion.region;
  }

  public searchByRegion(search: Region): void {

    this.selectedRegion = search;
    this.isLoading = true;
    this.service.searchRegion(search).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
