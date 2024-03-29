export const routerLinks = {
  home: "/",
  search: "/search",
  aboutUs: "/about",
  photos: "/photos",
  contactUs: "/contact-us",
  createReview: "/create-review",
  createPlace: "/create-place",
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
  personalAreaEditPlace: (placeId: number) =>
    `/personal-area/my-places/edit/${placeId}`,
  personalAreaEditReview: (reviewId: number) =>
    `/personal-area/my-reviews/edit/${reviewId}`,
  administrationBasePath: "/administration",
  administrationPlaces: "/administration/places",
  personalAreaBasePath: "/personal-area",
  moderationBasePath: "/moderation",
  moderationPlaces: "/moderation/places",
  moderationReviews: "/moderation/reviews",
  moderationReports: "/moderation/reports",
  placeModeration: (placeId: number) => `/moderation/places/${placeId}`,
  reviewModeration: (reviewId: number) => `/moderation/reviews/${reviewId}`,
};
