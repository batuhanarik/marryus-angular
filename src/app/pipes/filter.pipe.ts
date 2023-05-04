import { Pipe, PipeTransform } from '@angular/core';
import { WeddingPlace } from '../models/weddingPlace';
import { WeddingPlaceDetailDto } from '../models/weddingPlaceDetailDto';

@Pipe({
  name: 'filterpipe',
})
export class FilterPipe implements PipeTransform {
  filterText: string = '';
  transform(
    value: WeddingPlaceDetailDto[],
    filterText: string
  ): WeddingPlaceDetailDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (wp: WeddingPlaceDetailDto) =>
            wp.weddingPlaceName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
