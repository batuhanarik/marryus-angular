import { Component } from '@angular/core';
import { City } from 'src/app/models/City';
import { WeddingPlace } from 'src/app/models/weddingPlace';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

@Component({
  selector: 'app-wedding-places',
  templateUrl: './wedding-places.component.html',
})
export class WeddingPlacesComponent {
  weddingPlaces: WeddingPlaceDetailDto[] = [];
  cities: City[] = [];
  loading: boolean = false;
  filterText: string = '';
  constructor(
    private weddingPlaceService: WeddingplaceService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.getWeddingPlaces();
    this.getCities();
  }

  getWeddingPlaces() {
    this.loading = true;
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      this.weddingPlaces = res.data;
      console.log(this.weddingPlaces);
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
      console.log(this.cities);
    });
  }
}
