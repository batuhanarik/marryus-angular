import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
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
  confirmed = false;
  today: Date;
  maxDate: Date;
  maxReturnDate: Date;
  totalRentPrice: number;
  creditCardForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    this.maxDate = new Date();
    this.maxDate.setDate(this.today.getDate() + 30); //Maksimum seçebileceği tarihi belirtir (1 ay sonrasına kadar)

    this.maxReturnDate = new Date(); //Dönüş tarihi : aynı gün olacak.
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
    this.returnDate = undefined; // resets the return date to prevent bugs
    let i = 0;
    for (; i < this.occupiedDates.length; i++) {
      if (this.rentDate < this.occupiedDates[i]) break;
    }
    if (i == this.occupiedDates.length) {
      this.maxReturnDate = new Date();
      this.maxDate.setHours(23, 59, 59, 59); //kontrol et
      return;
    }
    this.maxReturnDate = new Date(this.occupiedDates[i]);
    this.maxReturnDate.setDate(this.maxReturnDate.getDate() - 1);
  }

  next() {
    if (!this.rentDate) {
      this.toastrService.error('Lütfen tarih seçiniz.');
    } else if (this.rentDate.getTime() == this.today.getTime()) {
      this.toastrService.error('Bugün kiralama işlemi yapılamaz!');
    }
    //  else if (!this.returnDate) {
    //   this.toastrService.error('Please select return date.');
    // }
    else {
      this.returnDate = this.rentDate;
      this.confirmed = true;
      this.totalRentPrice = 50000;
      console.log(this.totalRentPrice);
    }
  }
  back() {
    this.confirmed = false;
  }
  confirm() {
    if (!this.returnDate) {
      this.toastrService.error('Please select a valid return date');
      return;
    }
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
    };

    this.rentalService.rent(rental, card).subscribe((result) => {
      if (result.success) {
        this.toastrService.success(result.message);
        this.ref.close();
      } else {
        this.toastrService.error(result.message);
      }
    });
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
