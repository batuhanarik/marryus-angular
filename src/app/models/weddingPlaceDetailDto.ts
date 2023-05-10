import { WeddingPlaceImage } from './weddingPlaceImage';

export interface WeddingPlaceDetailDto {
  weddingPlaceId: number;
  categoryId: number;
  provinceId: number;
  weddingPlaceName: string;
  provinceName: string;
  categoryName: string;
  description: string;
  priceFirst: number;
  priceLast: number;
  discountRate: number;
  isAlcoholIncluded: boolean;
  isFoodIncluded: boolean;
  weddingPlaceImages: WeddingPlaceImage[];
}
