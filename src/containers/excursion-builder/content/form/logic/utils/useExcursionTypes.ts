import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { useTranslation } from "next-i18next";
import excursionTypeRegionImage from "/public/images/icons/excursion-type-region.png";
import excursionTypeOverviewImage from "/public/images/icons/excursion-type-overview.png";

const useExcursionTypes = () => {
  const { t } = useTranslation("excursion-management");
  const options = [
    {
      id: ExcursionTypesEnum.Overview,
      label: t("excursionTypes.overview"),
      image: excursionTypeOverviewImage.src,
    },
    {
      id: ExcursionTypesEnum.Region,
      label: t("excursionTypes.region"),
      image: excursionTypeRegionImage.src,
    },
  ];

  return options;
};

export default useExcursionTypes;
