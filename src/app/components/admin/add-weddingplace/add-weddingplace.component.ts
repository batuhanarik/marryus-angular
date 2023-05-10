import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/City';
import { Category } from 'src/app/models/category';
import { WeddingPlace } from 'src/app/models/weddingPlace';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';
import Swal from 'sweetalert2';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-add-weddingplace',
  templateUrl: './add-weddingplace.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzAlertModule,
    FileUploadModule,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddWeddingplaceComponent {
  isFoodIncluded: boolean = false;
  isAlcoholIncluded: boolean = false;
  hasAnyMeasureAgainstAdverseWeatherConditions: boolean = false;
  hasPrepRoom: boolean = false;
  hasHandicapEntrance: boolean = false;
  hasValetService: boolean = false;
  hasSoundLightandStageService: boolean = false;
  hasMenuTasting: boolean = false;
  hasAfterPartyArea: boolean = false;
  anotherWeddingAtPlaceSameTime: boolean = false;
  isCocktailIncluded: boolean = false;

  weddingPlaceForm = this._formBuilder.nonNullable.group({
    plateCode: [1, Validators.required],
    categoryId: [1, Validators.required],
    placeName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    description: ['', Validators.required],
    capacityFirst: [null, Validators.required],
    capacityLast: [null, Validators.required],
    priceFirstWeekday: [0, Validators.required],
    priceLastWeekday: [0, Validators.required],
    priceFirstWeekend: [0, Validators.required],
    priceLastWeekend: [0, Validators.required],
    address: ['', Validators.required],
    authorizedPersonName: ['', Validators.required],
    hasAnyMeasureAgainstAdverseWeatherConditions: [
      this.hasAnyMeasureAgainstAdverseWeatherConditions,
      Validators.required,
    ],
    hasPrepRoom: [this.hasPrepRoom, Validators.required],
    hasHandicapEntrance: [this.hasHandicapEntrance, Validators.required],
    hasValetService: [this.hasValetService, Validators.required],
    hasSoundLightandStageService: [
      this.hasSoundLightandStageService,
      Validators.required,
    ],
    hasMenuTasting: [this.hasMenuTasting, Validators.required],
    hasAfterPartyArea: [this.hasAfterPartyArea, Validators.required],
    anotherWeddingAtPlaceSameTime: [
      this.anotherWeddingAtPlaceSameTime,
      Validators.required,
    ],
    discountRate: [Validators.min(0)],
    placeOwnerId: 1,
    isReserved: [false, Validators.required],
    isFoodIncluded: [this.isFoodIncluded, Validators.required],
    isAlcoholIncluded: [this.isAlcoholIncluded, Validators.required],
    isCocktailIncluded: [this.isCocktailIncluded, Validators.required],
    priceAlcohol: [null],
    priceFood: [null],
    priceCocktail: [null],

    placeStatus: true,
  });
  cities: City[] = [];
  categories: Category[] = [];
  categoriesLoaded: boolean = false;

  images: any[] = [];
  loading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private weddingPlaceService: WeddingplaceService,
    private cityService: CityService,
    private categoryService: CategoryService,
    private wpService: WeddingplaceService,
    private router: Router,
    private cdrRef: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getCities();
    this.getCategories();
  }
  resetForm() {
    this.weddingPlaceForm.reset();
  }

  getCities() {
    this.cityService.getCities().subscribe((res) => {
      this.cities = res.data;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res.data;
      this.cdrRef.detectChanges();
    });
  }

  setImages(event: any) {
    this.images = [];
    for (let file of event.files) {
      this.images.push(file);
    }
    let plural = this.images.length > 1 ? 's' : '';
    this.toastrService.success(`${this.images.length} file${plural} selected`);
  }

  submit() {
    if (this.weddingPlaceForm.invalid) {
      return;
    }
    this.wpService
      .addWeddingPlace(this.weddingPlaceForm.value as unknown as WeddingPlace)
      .subscribe((res: any) => {
        this.toastrService.success(res.message);
        if (this.images) {
          this.weddingPlaceService
            .addWeddingPlaceImages(this.images, res.data)
            .subscribe((imgRes) => {
              console.log(res.data);
              if (imgRes.success) {
                this.toastrService.success(imgRes.message);
                this.weddingPlaceForm.reset();
                this.images = [];
              } else {
                this.toastrService.error(
                  imgRes.message,
                  'Resimler yüklenirken bir hata oluştu...'
                );
              }
            });
        }
      });
  }
}
