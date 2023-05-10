import { Component, Input } from '@angular/core';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-search-weddingplace',
  templateUrl: './search-weddingplace.component.html',
})
export class SearchWeddingplaceComponent {
  @Input() filterText: string = '';
  cities: City[] = [];
  constructor(private _city: CityService) {}

  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this._city.getCities().subscribe((cities) => {
      this.cities = cities.data;
    });
  }
}
