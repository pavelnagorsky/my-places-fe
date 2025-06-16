import { useTranslation } from "next-i18next";
import { ICardConfig } from "./interfaces";
import image1 from "/public/images/home-page/excursions/card-1.jpg";
import image2 from "/public/images/home-page/excursions/card-2.jpg";
import image3 from "/public/images/home-page/excursions/card-3.jpg";
import { routerLinks } from "@/routing/routerLinks";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { SearchExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";

const useCardsConfig = () => {
  const { t } = useTranslation("home");

  const config: ICardConfig[] = [
    {
      image: image1,
      title: t("excursions.card1.title"),
      description: t("excursions.card1.description"),
      filterValue: `${routerLinks.excursions}?placeTypeIds=${[2, 3, 4].join(
        ","
      )}`,
      chips: [
        {
          title: t("excursions.card1.filters.overview"),
          filterValue: `${routerLinks.excursions}?types=${ExcursionTypesEnum.Overview}`,
        },
        {
          title: t("excursions.card1.filters.driving"),
          filterValue: `${routerLinks.excursions}?travelModes=${TravelModesEnum.DRIVING}`,
        },
        {
          title: t("excursions.card1.filters.popular"),
          filterValue: `${routerLinks.excursions}?orderBy=${SearchExcursionsOrderByEnum.RATING}`,
        },
      ],
    },
    {
      image: image2,
      title: t("excursions.card2.title"),
      description: t("excursions.card2.description"),
      filterValue: `${routerLinks.excursions}?placeTypeIds=1`,
    },
    {
      image: image3,
      title: t("excursions.card3.title"),
      description: t("excursions.card3.description"),
      filterValue: `${routerLinks.excursions}?placeTypeIds=6`,
    },
  ];

  return config;
};

export default useCardsConfig;
