import {
  ChangeDetectorRef,
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-weddingplace-rent',
  templateUrl: './weddingplace-rent.component.html',
})
export class WeddingplaceRentComponent implements OnInit {
  rentDate: Date;
  returnDate: Date;
  occupiedDates: Date[];
  occupiedDatesLoaded = false;
  selectedDate: boolean = false;
  selectedCapacity: number = this.config.data.capacityFirst;
  confirmed = false;
  today: Date;
  maxDate: Date;
  maxReturnDate: Date;
  weddingPlacePrice: number = 0;
  creditCardForm: FormGroup;
  isAlcoholIncluded = false;
  isFoodIncluded = false;
  isCocktailIncluded = false;
  totalRentPrice: number = this.weddingPlacePrice * this.selectedCapacity;
  parametersModal = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private helper: HelperService
  ) {}
  ngOnInit(): void {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    this.maxDate = new Date();
    this.maxDate.setDate(this.today.getDate() + 90); //Maksimum seçebileceği tarihi belirtir (1 ay sonrasına kadar)

    this.maxReturnDate = new Date();
    this.getOccupiedDates();
    this.createCreditCardForm();
    console.log(this.config.data);
  }

  getOccupiedDates() {
    this.rentalService
      .getOccupiedDates(this.config.data.weddingPlaceId)
      .subscribe((res: any) => {
        if (res.success) {
          this.occupiedDates = res.data.map((d) => new Date(d));
          this.occupiedDates.push(this.today);
          this.occupiedDatesLoaded = true;
        }
      });
  }

  rentDaySelect(event: any) {
    console.log(event);
    this.returnDate = undefined; // resets the return date to prevent bugs
    let i = 0;
    for (; i < this.occupiedDates.length; i++) {
      if (this.rentDate < this.occupiedDates[i]) break;
    }
    if (i == this.occupiedDates.length) {
      this.maxReturnDate = new Date();
      this.maxDate.setHours(0, 0, 0, 0); //kontrol et
      return;
    }
    this.maxReturnDate = new Date(this.occupiedDates[i]);
    this.maxReturnDate.setDate(this.maxReturnDate.getDate());
  }
  calculateRentPrice() {
    let rentPrice = this.weddingPlacePrice * this.selectedCapacity;
    if (this.isAlcoholIncluded) {
      rentPrice += this.config.data.priceAlcohol * this.selectedCapacity;
    }
    if (this.isFoodIncluded) {
      rentPrice += this.config.data.priceFood * this.selectedCapacity;
    }
    if (this.isCocktailIncluded) {
      rentPrice += this.config.data.priceCocktail * this.selectedCapacity;
    }
    this.totalRentPrice = rentPrice;
    console.log(this.totalRentPrice);

    console.log(this.selectedCapacity);
    console.log(this.config.data.priceFood);

    if (this.config.data.discountRate > 0) {
      this.totalRentPrice -= (this.config.data.discountRate * rentPrice) / 100;
    }
  }

  next() {
    if (!this.rentDate) {
      this.toastrService.error('Lütfen tarih seçiniz.');
    } else if (this.rentDate.getTime() == this.today.getTime()) {
      this.toastrService.error('Bugün kiralama işlemi yapılamaz!');
    } else {
      this.rentDate.setHours(0, 0, 0, 0);
      this.returnDate = this.rentDate;
      this.selectedDate = true;
      const isWeekend = this.isRentDayWeekend(this.rentDate);
      this.weddingPlacePrice = isWeekend
        ? this.config.data.priceWeekend
        : this.config.data.priceWeekday;
    }
    this.calculateRentPrice();
    this.parametersModal = true;
  }
  back() {
    this.confirmed = false;
  }
  goToPayment() {
    // this.isParametersSelected = true;
    this.confirmed = true;
    this.parametersModal = false;
  }
  confirm() {
    let date = this.creditCardForm.value.date.split('/');
    let card: CreditCard = {
      cardHolderName: this.creditCardForm.value.cardHolderName,
      cardNumber: this.creditCardForm.value.cardNumber,
      cvc: this.creditCardForm.value.cvc,
      expireMonth: date[0],
      expireYear: date[1],
    };

    let rental: Rental = {
      id: 0,
      weddingPlaceId: parseInt(this.config.data.weddingPlaceId),
      customerId: this.authService.claims.userId,
      rentDate: this.rentDate,
      returnDate: this.rentDate,
      paidAmount: this.totalRentPrice,
      totalDiscount: this.config.data.discountRate,
    };

    this.rentalService.rent(rental, card).subscribe((result) => {
      this.toastrService.info('Ödeme alınıyor, lütfen bekleyiniz...');
      setTimeout(() => {
        if (result.success) {
          this.toastrService.success(result.message);
          this.ref.close();
          const htmlContent = `<h1>SA</h1>`;
          this.helper.saveToPdf(htmlContent);
        } else {
          this.toastrService.error(result.message);
        }
      }, 3000);
    });
  }
  isRentDayWeekend(rent: Date) {
    let dayOfWeek = rent.getDay();
    let isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    return isWeekend;
  }
  alcoholIncluded() {
    this.isAlcoholIncluded = !this.isAlcoholIncluded;
  }
  cocktailIncluded() {
    this.isCocktailIncluded = !this.isCocktailIncluded;
  }
  foodIncluded() {
    this.isFoodIncluded = !this.isFoodIncluded;
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardHolderName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
    });
  }
}
