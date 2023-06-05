import { WeddingPlaceImage } from './weddingPlaceImage';

export interface WeddingPlaceDetailDto {
  weddingPlaceId: number;
  categoryId: number;
  provinceId: number;
  weddingPlaceName: string;
  provinceName: string;
  categoryName: string;
  phoneNumber: string;
  address: string;
  description: string;
  capacityFirst: number;
  capacityLast: number;
  priceWeekday: number;
  priceWeekend: number;
  priceAlcohol: number;
  priceFood: number;
  priceCocktail: number;
  discountRate: number;
  isAlcoholIncluded: boolean;
  isFoodIncluded: boolean;
  isCocktailIncluded: boolean;
  hasAfterPartyArea: boolean;
  hasMenuTasting: boolean;
  hasSoundLightandStageService: boolean;
  hasValetService: boolean;
  hasHandicapEntrance: boolean;
  hasPrepRoom: boolean;
  hasAnyMeasureAgainstAdverseWeatherConditions: boolean;
  authorizedPersonName: string;
  weddingPlaceImages: WeddingPlaceImage[];
}
