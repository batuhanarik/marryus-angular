import { Component } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
})
export class RentalsComponent {
  rentals: RentalDetailDto[] = [];
  rentalsLoaded = false;
  constructor(private rentalService: RentalService) {}
  ngOnInit(): void {
    this.getRentals();
  }
  getRentals() {
    this.rentalService.getRentalDetails().subscribe((res: any) => {
      if (res.success) {
        this.rentals = res.data;
        this.rentalsLoaded = true;
        console.log(this.rentals);
      }
    });
  }
}
