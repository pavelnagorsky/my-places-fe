import { useTranslation } from "next-i18next";
import { ICardConfig } from "./interfaces";
import image1 from "/public/images/home-page/excursions/card-1.jpg";
import image2 from "/public/images/home-page/excursions/card-2.jpg";
import image3 from "/public/images/home-page/excursions/card-3.jpg";

const useCardsConfig = () => {
  const { t } = useTranslation("home");

  const config: ICardConfig[] = [
    {
      image: image1,
      title: "Дворцы, музеи и замки Беларуси",
      description:
        "Каждый из этих объектов расскажет вам свою уникальную историю, оставляя при этом незабываемые впечатления.",
      filterValue: "type=1",
      chips: ["Обзорная", "На машине", "Популярный маршрут"],
    },
    {
      image: image2,
      title: "Восхитительные объекты природы",
      description:
        "Беларусь славится своими живописными природными ландшафтами, лесными просторами и разнообразием экосистем.",
      filterValue: "type=2",
    },
    {
      image: image3,
      title: "Храмы и церковные сооружения",
      description:
        "Храмы Беларуси — это не только духовное обогащение, но и отличная возможность прикоснуться к богатой культуре.",
      filterValue: "type=3",
    },
  ];

  return config;
};

export default useCardsConfig;
