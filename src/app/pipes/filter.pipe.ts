import { Pipe, PipeTransform } from '@angular/core';
import { WeddingPlace } from '../models/weddingPlace';

@Pipe({
  name: 'filterpipe',
  standalone:true,
  
})
export class FilterPipe implements PipeTransform {
  filterText: string = '';
  transform(value: WeddingPlace[], filterText: string): WeddingPlace[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (wp: WeddingPlace) =>
            wp.placeName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
