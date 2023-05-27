import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { catchError, of } from 'rxjs';
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
          this.createWeddingPlaceUpdateForm();
          this.getWeddingPlaceImages();
          this.wpLoaded = true;
          console.log(res.data);
        }
      });
  }
  getWeddingPlaceImages() {
    this.weddingPlaceService
      .getWeddingPlaceImagesById(this.weddingPlace.weddingPlaceId)
      .subscribe((res: any) => {
        if (res.success) {
          this.images = res.data;
          console.log(this.images);
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
  createWeddingPlaceUpdateForm() {
    this.weddingPlaceUpdateForm = this.formBuilder.group({
      weddingPlaceId: [this.weddingPlace.weddingPlaceId],
      plateCode: [this.weddingPlace.plateCode, Validators.required],
      categoryId: [this.weddingPlace.categoryId, Validators.required],
      placeName: [this.weddingPlace.placeName, Validators.required],
      phoneNumber: [this.weddingPlace.phoneNumber, Validators.required],
      description: [this.weddingPlace.description, Validators.required],
      capacityFirst: [this.weddingPlace.capacityFirst, Validators.required],
      capacityLast: [this.weddingPlace.capacityLast, Validators.required],
      priceWeekday: [this.weddingPlace.priceWeekday, Validators.required],
      priceWeekend: [this.weddingPlace.priceWeekend, Validators.required],
      discountRate: [this.weddingPlace.discountRate, Validators.required],
      isFoodIncluded: [this.weddingPlace.isFoodIncluded, Validators.required],
      isAlcoholIncluded: [
        this.weddingPlace.isAlcoholIncluded,
        Validators.required,
      ],
      isCocktailIncluded: [
        this.weddingPlace.isAlcoholIncluded,
        Validators.required,
      ],
      hasAfterPartyArea: [
        this.weddingPlace.hasAfterPartyArea,
        Validators.required,
      ],
      hasMenuTasting: [this.weddingPlace.hasMenuTasting, Validators.required],
      hasSoundLightandStageService: [
        this.weddingPlace.hasSoundLightandStageService,
        Validators.required,
      ],
      hasValetService: [this.weddingPlace.hasValetService, Validators.required],
      hasHandicapEntrance: [
        this.weddingPlace.hasHandicapEntrance,
        Validators.required,
      ],
      hasPrepRoom: [this.weddingPlace.hasPrepRoom, Validators.required],
      hasAnyMeasureAgainstAdverseWeatherConditions: [
        this.weddingPlace.hasAnyMeasureAgainstAdverseWeatherConditions,
        Validators.required,
      ],
      authorizedPersonName: [
        this.weddingPlace.authorizedPersonName,
        Validators.required,
      ],
      address: [this.weddingPlace.address, Validators.required],

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
      .pipe(
        catchError((res: any) => {
          this.toastrService.error(res.error.message);
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result.success) {
          this.toastrService.success(result.message);
          this.getWeddingPlaceImages();
        } else {
          this.toastrService.success(result.message);
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
