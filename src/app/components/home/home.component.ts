import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';
import { City } from 'src/app/models/City';
import { Category } from 'src/app/models/category';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  hasAnyMeasureAgainstAdverseWeatherConditions: boolean = false;
  hasMenuTasting: boolean = false;
  hasHandicapEntrance: boolean = false;
  hasPrepRoom: boolean = false;
  hasValetService: boolean = false;
  isCocktailIncluded: boolean = false;
  isAlcoholIncluded: boolean = false;
  isFoodIncluded: boolean = false;
  date: Date;
  filterForm: FormGroup;
  weddingPlaces: WeddingPlaceDetailDto[] = [];
  cities: City[] = [];
  citiesLoaded: boolean = false;
  categories: Category[] = [];
  categoriesLoaded: boolean = false;
  loading: boolean = false;
  filterText: string = '';
  noResultText: string = 'Üzgünüz, hayalinizdeki düğün yerini bulamadık...';
  messagesNoResult: Message[];
  constructor(
    private weddingPlaceService: WeddingplaceService,
    private cityService: CityService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getWeddingPlaces();
    this.getCities();
    this.getCategories();
    this.createFilterForm();
  }
  getWeddingPlaces() {
    this.loading = true;
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      this.weddingPlaces = res.data;
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
      this.citiesLoaded = true;
    });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.categoriesLoaded = true;
    });
  }
  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      placeName: [null],
      categoryId: [null],
      plateCode: [null],
      minPriceWeekday: [null],
      maxPriceWeekday: [null],
      minPriceWeekend: [null],
      maxPriceWeekend: [null],
      hasAnyMeasureAgainstAdverseWeatherConditions: [null],
      hasMenuTasting: [null],
      hasHandicapEntrance: [null],
      hasPrepRoom: [null],
      hasValetService: [null],
      isCocktailIncluded: [null],
      isAlcoholIncluded: [null],
      isFoodIncluded: [null],
    });
  }
  clearAllFilters() {
    // document.getElementById('p-accordiontab-0').click();
    this.filterForm.reset();
    this.loading = true;
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      this.weddingPlaces = res.data;
      this.loading = false;
    });
  }
}
