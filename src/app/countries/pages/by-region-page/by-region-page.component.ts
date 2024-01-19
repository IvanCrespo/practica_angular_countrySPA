import { Component, OnInit } from '@angular/core';

// Interface
import { Country } from '../../interfaces/country';

// Service
import { CountriesService } from '../../services/countries.service';

// Type
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public seletedRegion?: Region;
  public isLoading: boolean = false;

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.seletedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region) {
    this.isLoading = true;
    this.seletedRegion = region;
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
