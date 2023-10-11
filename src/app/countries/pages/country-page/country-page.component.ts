import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs'
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  public country?: Country | null;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private service: CountriesService,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.service.searchCountryByalphaCode(id))).subscribe(
        country => {
          if (!country) {
            this.router.navigateByUrl('')
          }
          this.country = country;
        }
      )
  }

}
