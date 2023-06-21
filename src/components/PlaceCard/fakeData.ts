import { ISearchPlace } from "@/services/places-service/search-place.interface";

const place: ISearchPlace = {
  id: 1,

  // Place url path
  slug: "krevskiy-zamok",

  // Place title
  title: "Кревский замок",

  description:
    "Кревский замок - старинный памятник архитектуры Беларуси. Он является одним из первых замков Великого княжества Литовского. На данный момент всё ещё в стадии реставрации.",

  // Likes count
  likesCount: 25,

  // Views count
  viewsCount: 145,

  // Place address
  address:
    "Гродненская область, Сморгонский район, Кревский сельсовет, агрогородок Крево",

  // Place type
  type: {
    id: 1,
    title: "Замок",
    commercial: false,
    image: null,
  },

  // Place categories
  categories: [
    {
      id: 1,
      title: "Замок",
      image: null,
    },
    {
      id: 2,
      title: "Исторический",
      image: null,
    },
    {
      id: 3,
      title: "Руины",
      image: null,
    },
  ],

  // Place image
  image:
    "https://www.holiday.by/files/sights/thumbnails/sights_gallery_fullsize/krevo_zamok_aed28ba4d0afd1acb9bed4fd343a283e669-orig.jpg",

  // Place coordinates {lat;lng}
  coordinates: {
    lat: 52.444187372354264,
    lng: 30.97368181834729,
  },

  // Place website url
  website: null,

  // is place an advertisement
  advertisement: false,

  // advertisement end date
  advEndDate: null,

  // created at
  createdAt: new Date().toISOString(),
};

export const fakePlaces: ISearchPlace[] = [place, place, place];
