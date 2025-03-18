import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";
import drivingImage from "/public/images/icons/travel-mode-driving.png";
import walkingImage from "/public/images/icons/travel-mode-walking.png";

const useTravelModeOptions = () => {
  const { t } = useTranslation("common");
  const options = [
    {
      id: TravelModesEnum.DRIVING,
      label: t("travelModes.driving"),
      image: drivingImage.src,
    },
    {
      id: TravelModesEnum.WALKING,
      label: t("travelModes.walking"),
      image: walkingImage.src,
    },
  ];

  return options;
};

export default useTravelModeOptions;
