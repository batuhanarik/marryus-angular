import { Component, Input } from '@angular/core';
import { WeddingPlace } from 'src/app/models/weddingPlace';

@Component({
  selector: 'app-wedding-place-item',
  templateUrl: './wedding-place-item.component.html',
})
export class WeddingPlaceItemComponent {
  @Input() weddingPlace!: WeddingPlace;
}
