export interface Rental {
  id: number;
  weddingPlaceId: number;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  paidAmount: number;
  totalDiscount: number;
}
