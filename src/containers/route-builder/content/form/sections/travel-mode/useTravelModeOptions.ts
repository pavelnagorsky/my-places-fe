import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";

const useTravelModeOptions = () => {
  const { t } = useTranslation("common");
  const options = [
    {
      id: TravelModesEnum.DRIVING,
      label: t("travelModes.driving"),
    },
    {
      id: TravelModesEnum.WALKING,
      label: t("travelModes.walking"),
    },
  ];

  return options;
};

export default useTravelModeOptions;
