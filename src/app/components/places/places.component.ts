import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { Message } from 'primeng/api';
import { City } from 'src/app/models/City';
import { Category } from 'src/app/models/category';
import { FilterOptions } from 'src/app/models/filterOptions';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent {
  first: number = 0;
  rows: number = 5;
  pageSize: number = 6;
  totalItems = 0;

  drawerVisible: boolean = false;
  placement: NzDrawerPlacement = 'left';
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
  @ViewChild('scrollRef', { static: true }) scrollRef: ElementRef;
  constructor(
    private weddingPlaceService: WeddingplaceService,
    private cityService: CityService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.createFilterForm();

    this.getDetailsByFilter();
    this.getCities();
    this.getCategories();
    this.messagesNoResult = [
      {
        severity: 'error',
        summary: 'Üzgünüz :(',
        detail: 'Hayalinizdeki düğün yeri henüz yok...',
      },
    ];
  }
  getWeddingPlaces() {
    this.loading = true;
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      this.weddingPlaces = res.data;
      this.loading = false;
    });
  }
  getWeddingPlaceDetailsByPagination(event: any) {
    this.loading = true;
    this.scrollRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const page = event.page + 1;
    console.log(page);
    const pageSize = this.pageSize;
    this.weddingPlaceService
      .getWeddingPlaceDetailsByPagination(page, pageSize)
      .subscribe((res: any) => {
        this.weddingPlaces = res.data;
        this.totalItems = res.data.length;
        this.loading = false;
      });
  }

  getDetailsByFilter() {
    this.loading = true;
    this.scrollRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    this.weddingPlaceService
      .getDetailsByFilter(this.filterForm.value as FilterOptions)
      .subscribe((res: any) => {
        if (res.success) {
          this.weddingPlaces = res.data;
          console.log(this.weddingPlaces);
          this.filterForm.reset();
          this.loading = false;
        }
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
    this.scrollRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    this.filterForm.reset();
    this.loading = true;
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      this.weddingPlaces = res.data;
      this.loading = false;
    });
  }

  changeDrawerState() {
    this.drawerVisible = !this.drawerVisible;
  }
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
