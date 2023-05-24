import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'src/app/models/City';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

@Component({
  selector: 'app-weddingplace-items',
  templateUrl: './weddingplace-items.component.html',
})
export class WeddingplaceItemsComponent {
  filterForm: FormGroup;
  weddingPlaces: WeddingPlaceDetailDto[] = [];
  cities: City[] = [];
  citiesLoaded: boolean = false;
  loading: boolean = false;
  filterText: string = '';
  constructor(
    private weddingPlaceService: WeddingplaceService,
    private cityService: CityService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getWeddingPlaces();
    this.getCities();
    window.scrollTo(0, 0);
  }

  getWeddingPlaces() {
    this.loading = true;
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      this.weddingPlaces = res.data;
      this.loading = false;
    });
  }

  getWeddingPlaceDetailsByCity(id: number) {
    this.loading = true;
    this.weddingPlaceService
      .getWeddingPlaceDetailsByCity(id)
      .subscribe((res: any) => {
        this.weddingPlaces = res.data;
        this.loading = false;
      });
    console.log(id);
  }

  getCities() {
    this.cityService.getCities().subscribe((res: any) => {
      this.cities = res.data;
      this.citiesLoaded = true;
    });
  }

  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      plateCode: [null],
      priceWeekday: [null],
      priceWeekend: [null],
      priceAlcohol: [null],
      priceFood: [null],
    });
  }
}
