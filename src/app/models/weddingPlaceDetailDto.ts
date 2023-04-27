import { WeddingPlaceImage } from './weddingPlaceImage';

export interface WeddingPlaceDetailDto {
  weddingPlaceId: number;
  weddingPlaceName: string;
  province: string;
  categoryName: string;
  priceFirst: number;
  priceLast: number;
  weddingPlaceImages: WeddingPlaceImage[];
}
