export class FilterOptions {
  placeName: string;
  categoryId: number = 0;
  plateCode: number = 0;
  minPriceWeekday: number = 0;
  maxPriceWeekday: number = 0;
  minPriceWeekend: number = 0;
  maxPriceWeekend: number = 0;
  hasAnyMeasureAgainstAdverseWeatherConditions: boolean = null;
  hasMenuTasting: boolean = null;
  hasHandicapEntrance: boolean = null;
  hasPrepRoom: boolean = null;
  hasValetService: boolean = null;
  isCocktailIncluded: boolean = null;
  isAlcoholIncluded: boolean = null;
  isFoodIncluded: boolean = null;
}
