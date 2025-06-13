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
      title: "Дворцы, музеи и замки Беларуси",
      description:
        "Каждый из этих объектов расскажет вам свою уникальную историю, оставляя при этом незабываемые впечатления.",
      filterValue: `${routerLinks.excursions}?placeTypeIds=${[1, 2, 3].join(
        ","
      )}`,
      chips: [
        {
          title: "Обзорная",
          filterValue: `${routerLinks.excursions}?types=${ExcursionTypesEnum.Overview}`,
        },
        {
          title: "На машине",
          filterValue: `${routerLinks.excursions}?travelModes=${TravelModesEnum.DRIVING}`,
        },
        {
          title: "Популярные маршруты",
          filterValue: `${routerLinks.excursions}?orderBy=${SearchExcursionsOrderByEnum.RATING}`,
        },
      ],
    },
    {
      image: image2,
      title: "Восхитительные объекты природы",
      description:
        "Беларусь славится своими живописными природными ландшафтами, лесными просторами и разнообразием экосистем.",
      filterValue: `${routerLinks.excursions}?placeTypeIds=1`,
    },
    {
      image: image3,
      title: "Храмы и церковные сооружения",
      description:
        "Храмы Беларуси — это не только духовное обогащение, но и отличная возможность прикоснуться к богатой культуре.",
      filterValue: `${routerLinks.excursions}?placeTypeIds=1`,
    },
  ];

  return config;
};

export default useCardsConfig;
