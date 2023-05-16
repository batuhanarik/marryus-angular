export interface WeddingPlace {
  weddingPlaceId: number;
  plateCode: number;
  categoryId: number;
  placeName: string;
  phoneNumber: string;
  description: string;
  address: string;
  capacityFirst: number;
  capacityLast: number;
  priceWeekday: number;
  priceWeekend: number;
  discountRate: number;
  placeOwnerId: number;
  isReserved: boolean;
  isFoodIncluded: boolean;
  isAlcoholIncluded: boolean;
  isCocktailIncluded: boolean;
  hasAfterPartyArea: boolean;
  hasMenuTasting: boolean;
  hasSoundLightandStageService: boolean;
  hasValetService: boolean;
  hasHandicapEntrance: boolean;
  hasPrepRoom: boolean;
  hasAnyMeasureAgainstAdverseWeatherConditions: boolean;
  authorizedPersonName: string;
  placeStatus: boolean;
}
