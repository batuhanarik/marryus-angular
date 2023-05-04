import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { City } from 'src/app/models/City';
import { Category } from 'src/app/models/category';
import { WeddingPlace } from 'src/app/models/weddingPlace';
import { WeddingPlaceImage } from 'src/app/models/weddingPlaceImage';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

@Component({
  selector: 'app-update-weddingplace',
  templateUrl: './update-weddingplace.component.html',
})
export class UpdateWeddingplaceComponent {
  categories: Category[];
  categoriesLoaded: boolean = false;

  cities: City[];
  citiesLoaded: boolean = false;

  images: WeddingPlaceImage[];
  imagesLoaded: boolean = false;

  weddingPlace: WeddingPlace;
  wpLoaded: boolean = false;

  weddingPlaceUpdateForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private cityService: CityService,
    private weddingPlaceService: WeddingplaceService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.getWeddingPlace();
    this.getCities();
    this.getCategories();
  }

  getWeddingPlace() {
    console.log(this.config.data);
    this.weddingPlaceService
      .getWeddingPlaceById(this.config.data.weddingPlaceId)
      .subscribe((res: any) => {
        if (res.success) {
          this.weddingPlace = res.data;
          this.createCarUpdateForm();
          this.getWeddingPlaceImages();
          this.wpLoaded = true;
        }
      });
  }
  getWeddingPlaceImages() {
    this.weddingPlaceService
      .getWeddingPlaceImagesById(this.weddingPlace.weddingPlaceId)
      .subscribe((res: any) => {
        if (res.success) {
          this.images = res.data;
          this.imagesLoaded = true;
        }
      });
  }
  getCities() {
    this.cityService.getCities().subscribe((res: any) => {
      this.cities = res.data;
      this.citiesLoaded = true;
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.categoriesLoaded = true;
    });
  }
  createCarUpdateForm() {
    this.weddingPlaceUpdateForm = this.formBuilder.group({
      weddingPlaceId: [this.weddingPlace.weddingPlaceId],
      plateCode: [this.weddingPlace.plateCode, Validators.required],
      categoryId: [this.weddingPlace.categoryId, Validators.required],
      placeName: [this.weddingPlace.placeName, Validators.required],
      phoneNumber: [this.weddingPlace.phoneNumber, Validators.required],
      description: [this.weddingPlace.description, Validators.required],
      capacity: [this.weddingPlace.capacity, Validators.required],
      priceFirst: [this.weddingPlace.priceFirst, Validators.required],
      priceLast: [this.weddingPlace.priceLast, Validators.required],
      discountRate: [this.weddingPlace.discountRate, Validators.required],
      isFoodIncluded: [this.weddingPlace.isFoodIncluded, Validators.required],
      isAlcoholIncluded: [
        this.weddingPlace.isAlcoholIncluded,
        Validators.required,
      ],
      placeStatus: [true, Validators.required],
    });
  }

  updateWeddingPlace() {
    this.weddingPlaceService
      .updateWeddingPlace(this.weddingPlaceUpdateForm.value)
      .subscribe((result) => {
        if (result.success) {
          this.toastrService.success(result.message);
        }
      });
  }

  uploadImages(event: any) {
    let imagesToUpload = [];
    for (const image of event.files) {
      imagesToUpload.push(image);
    }
    this.weddingPlaceService
      .addWeddingPlaceImages(imagesToUpload, this.weddingPlace.weddingPlaceId)
      .subscribe((result) => {
        if (result.success) {
          this.toastrService.success(result.message);
          this.getWeddingPlaceImages();
        }
      });
  }

  deleteImage(image: WeddingPlaceImage) {
    this.weddingPlaceService
      .deleteWeddingPlaceImage(image)
      .subscribe((result) => {
        if (result.success) {
          this.toastrService.success(result.message);
          this.getWeddingPlaceImages();
        }
      });
  }
}
