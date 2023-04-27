import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'apiImage',
})
export class ApiImagePipe implements PipeTransform {
  transform(value: string): string {
    return environment.apiUrlWithoutUrl + '/' + value;
  }
}
