export interface WeddingPlace {
  // weddingPlaceId: number;
  plateCode: number;
  categoryId: number;
  placeName: string;
  phoneNumber: string;
  description: string;
  capacity: number;
  priceFirst: number;
  priceLast: number;
  discountRate: number;
  placeOwnerId: number;
  isReserved: boolean;
  isFoodIncluded: boolean;
  isAlcoholIncluded: boolean;
  placeStatus: boolean;
}
