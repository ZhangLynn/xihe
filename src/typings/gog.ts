export namespace gog {
  export interface Video {
    id: string;
    provider: string;
  }

  export interface Price {
    amount: string;
    baseAmount: string;
    finalAmount: string;
    isDiscounted: boolean;
    discountPercentage: number;
    discountDifference: string;
    symbol: string;
    isFree: boolean;
    discount: number;
    isBonusStoreCreditIncluded: boolean;
    bonusStoreCreditAmount: string;
    promoId?: number;
  }

  export interface Availability {
    isAvailable: boolean;
    isAvailableInAccount: boolean;
  }

  export interface Date {
    date: string;
    timezone_type: number;
    timezone: string;
  }

  export interface SalesVisibility {
    isActive: boolean;
    fromObject: Date;
    from: number;
    toObject: Date;
    to: number;
  }

  export interface Platform {
    Windows: boolean;
    Mac: boolean;
    Linux: boolean;
  }

  export interface Game {
    customAttributes: any[];
    developer: string;
    publisher: string;
    gallery: string[];
    video: Video;
    supportedOperatingSystems: string[];
    genres: string[];
    globalReleaseDate: number;
    isTBA: boolean;
    price: Price;
    isDiscounted: boolean;
    isInDevelopment: boolean;
    id: number;
    releaseDate: number;
    availability: Availability;
    salesVisibility: SalesVisibility;
    buyable: boolean;
    title: string;
    image: string;
    url: string;
    supportUrl: string;
    forumUrl: string;
    worksOn: Platform;
    category: string;
    originalCategory: string;
    rating: number;
    type: number;
    isComingSoon: boolean;
    isPriceVisible: boolean;
    isMovie: boolean;
    isGame: boolean;
    slug: string;
    isWishlistable: boolean;
  }
}
