export interface WeddingPlace {
  weddingPlaceId: number;
  placeCode: string;
  plateCode: number;
  categoryId: number;
  placeName: string;
  plateName: string;
  phoneNumber: string;
  description: string;
  capacity: number;
  priceFirst: number;
  priceLast: number;
  discount_1: number;
  discount_2: number;
  discount_3: number;
  placeOwnerId: number;
  isReserved: boolean;
  isFoodIncluded: boolean;
  isAlcoholIncluded: boolean;
  placeStatus: boolean;
}
