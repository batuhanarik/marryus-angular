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
export class WeddingPlacesComponent {}
