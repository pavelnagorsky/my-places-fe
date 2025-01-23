export const routerLinks = {
  home: "/",
  search: "/search",
  aboutUs: "/about",
  photos: "/photos",
  contactUs: "/contact-us",
  createReview: "/create-review",
  createPlace: "/create-place",
  createRoute: "/create-route",
  place: (slug: string) => `/places/${slug}`,
  review: (placeSlug: string, reviewId: number) =>
    `/places/${placeSlug}?review=${reviewId}`,
  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
  administrationPlaceCategories: "/administration/place-categories",
  administrationPlaceTypes: "/administration/place-types",
  administrationUsers: "/administration/users",
  administrationFeedbackList: "/administration/feedback-list",
  personalAreaPlaces: "/personal-area/my-places",
  personalAreaReviews: "/personal-area/my-reviews",
  personalAreaSettings: "/personal-area/settings",
  personalAreaFavourites: "/personal-area/favourites",
  personalAreaRoutes: "/personal-area/my-routes",
  personalAreaEditPlace: (placeId: number) =>
    `/personal-area/my-places/${placeId}/edit`,
  personalAreaEditReview: (reviewId: number) =>
    `/personal-area/my-reviews/${reviewId}/edit`,
  personalAreaEditRoute: (routeId: number) =>
    `/personal-area/my-routes/${routeId}/edit`,
  administrationBasePath: "/administration",
  administrationPlaces: "/administration/places",
  administrationPlace: (placeId: number) => `/administration/places/${placeId}`,
  administrationEditPlace: (placeId: number) =>
    `/administration/places/${placeId}/edit`,
  administrationEditReview: (reviewId: number) =>
    `/administration/reviews/${reviewId}/edit`,
  personalAreaBasePath: "/personal-area",
  moderationBasePath: "/moderation",
  moderationPlaces: "/moderation/places",
  moderationReviews: "/moderation/reviews",
  moderationReports: "/moderation/reports",
  placeModeration: (placeId: number) => `/moderation/places/${placeId}`,
  reviewModeration: (reviewId: number) => `/moderation/reviews/${reviewId}`,
};
