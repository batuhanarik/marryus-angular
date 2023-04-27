import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

@Component({
  selector: 'app-add-photo-weddingplace',
  templateUrl: './add-photo-weddingplace.component.html',
})
export class AddPhotoWeddingplaceComponent {
  fileData: any = null;
  wpImage: string = '';

  constructor(private weddingPlaceService: WeddingplaceService) {}
  ngOnInit() {}
}
