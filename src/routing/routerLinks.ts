export const routerLinks = {
  home: "/",
  places: "/places",
  aboutUs: "/about",
  photos: "/photos",
  contactUs: "/contact-us",
  createReview: "/create-review",
  createPlace: "/create-place",
  createRoute: "/create-route",
  createExcursion: "/create-excursion",
  place: (slug: string) => `/places/${slug}`,
  review: (placeSlug: string, reviewId: number) =>
    `/places/${placeSlug}?review=${reviewId}`,
  excursion: (slug: string) => `/excursions/${slug}`,
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
  administrationRegions: "/administration/regions",
  administrationPlaceCategories: "/administration/place-categories",
  administrationPlaceTypes: "/administration/place-types",
  administrationUsers: "/administration/users",
  administrationFeedbackList: "/administration/feedback-list",
  personalAreaPlaces: "/personal-area/places",
  personalAreaReviews: "/personal-area/reviews",
  personalAreaSettings: "/personal-area/settings",
  personalAreaFavourites: "/personal-area/favourites",
  personalAreaRoutes: "/personal-area/routes",
  personalAreaExcursions: "/personal-area/excursions",
  personalAreaEditPlace: (placeId: number) =>
    `/personal-area/places/${placeId}/edit`,
  personalAreaEditReview: (reviewId: number) =>
    `/personal-area/reviews/${reviewId}/edit`,
  personalAreaEditRoute: (routeId: number) =>
    `/personal-area/routes/${routeId}/edit`,
  personalAreaEditExcursion: (excursionId: number) =>
    `/personal-area/excursions/${excursionId}/edit`,
  administrationBasePath: "/administration",
  administrationPlaces: "/administration/places",
  administrationPlace: (placeId: number) => `/administration/places/${placeId}`,
  administrationEditPlace: (placeId: number) =>
    `/administration/places/${placeId}/edit`,
  administrationExcursions: "/administration/excursions",
  administrationExcursion: (excursionId: number) =>
    `/administration/excursions/${excursionId}`,
  administrationEditExcursion: (excursionId: number) =>
    `/administration/excursions/${excursionId}/edit`,
  administrationEditReview: (reviewId: number) =>
    `/administration/reviews/${reviewId}/edit`,
  personalAreaBasePath: "/personal-area",
  moderationBasePath: "/moderation",
  moderationPlaces: "/moderation/places",
  moderationReviews: "/moderation/reviews",
  moderationExcursions: "/moderation/excursions",
  moderationReports: "/moderation/reports",
  placeModeration: (placeId: number) => `/moderation/places/${placeId}`,
  reviewModeration: (reviewId: number) => `/moderation/reviews/${reviewId}`,
  excursionModeration: (excursionId: number) =>
    `/moderation/excursions/${excursionId}`,
  excursions: `/excursions`,
};
