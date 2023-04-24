import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { City } from 'src/app/models/City';
import { Category } from 'src/app/models/category';
import { WeddingPlace } from 'src/app/models/weddingPlace';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-weddingplace',
  templateUrl: './add-weddingplace.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzAlertModule],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddWeddingplaceComponent {
  isFoodIncluded:boolean=false;
  isAlcoholIncluded:boolean=false;
  weddingPlaceForm = this._formBuilder.nonNullable.group({
    plateCode: [1, Validators.required],
    categoryId: [1, Validators.required],
    placeName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    description: ['', Validators.required],
    capacity: [0, Validators.required],
    priceFirst: [0, Validators.required],
    priceLast: [0, Validators.required],
    discountRate: [Validators.min(0)],
    placeOwnerId: 1,
    isReserved: [false, Validators.required],
    isFoodIncluded: [this.isFoodIncluded, Validators.required],
    isAlcoholIncluded: [this.isAlcoholIncluded, Validators.required],
    placeStatus: true,
  });
  cities: City[] = [];
  categories: Category[] = [];
  imageUrl: any = '';
  loading:boolean=false;


  constructor(
    private _formBuilder: FormBuilder,
    private weddingPlaceService: WeddingplaceService,
    private cityService: CityService,
    private categoryService: CategoryService,
    private wpService:WeddingplaceService,
    private router:Router
  ) {}
  
  ngOnInit() {
    this.getCities();
    this.getCategories();
  }
  resetForm(){
    this.weddingPlaceForm.reset();
  }

  getCities() {
    this.cityService.getCities().subscribe((res) => {
      this.cities = res.data;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories=res.data;
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent) => {
      this.imageUrl = (<FileReader>e.target).result?.toString();
    };
    reader.readAsDataURL(file);
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.imageUrl);

    this.weddingPlaceService.addWeddingPlaceImage(formData).subscribe((res) => {
      console.log(res.data);
    });
  }

  submit() {
    if (this.weddingPlaceForm.invalid) {
      return;
    }
    this.wpService.addWeddingPlace(this.weddingPlaceForm.value as unknown as WeddingPlace).subscribe(res=>{
      console.log(res.data);
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: `Mekan başarıyla eklendi!`,
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        this.router.navigate(['/admin']);
      })
      
    })

    // this._service.login(this.form.value as LoginInput).subscribe();
  }
}
