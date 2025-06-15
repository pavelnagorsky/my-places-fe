import { useTranslation } from "next-i18next";
import { ICardConfig } from "@/containers/home/content/places-section/logic/interfaces";
import image1 from "/public/images/home-page/places/card-1.jpg";
import image2 from "/public/images/home-page/places/card-2.jpg";
import image3 from "/public/images/home-page/places/card-3.jpg";
import image4 from "/public/images/home-page/places/card-4.jpg";
import image5 from "/public/images/home-page/places/card-5.jpg";
import image6 from "/public/images/home-page/places/card-6.jpg";
import image7 from "/public/images/home-page/places/card-7.jpg";
import icon1 from "/public/images/home-page/places/church-type.png";
import icon2 from "/public/images/home-page/places/museum-type.png";
import ratingIcon from "/public/images/home-page/places/rating.png";
import { routerLinks } from "@/routing/routerLinks";
import { SearchPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";

const useCardsConfig = () => {
  const { t } = useTranslation("home");

  const config: ICardConfig[] = [
    {
      images: [image1],
      filter: {
        title: t("places.church"),
        placesCount: 940,
        image: icon1,
        filterValue: `${routerLinks.places}?types=6`,
      },
    },
    {
      images: [image2],
    },
    {
      clickableSection: {
        title: t("places.learnMore"),
        icon: ratingIcon,
        filterValue: `${routerLinks.places}?orderBy=${SearchPlacesOrderByEnum.RATING}`,
      },
      images: [image3, image4, image5, image6],
    },
    {
      images: [image7],
      filter: {
        title: t("places.museum"),
        placesCount: 211,
        image: icon2,
        filterValue: `${routerLinks.places}?types=2`,
      },
    },
  ];

  return config;
};

export default useCardsConfig;
