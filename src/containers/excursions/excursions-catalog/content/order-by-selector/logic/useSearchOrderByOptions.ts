import { SearchOrderByStringEnum } from "@/containers/places/logic/interfaces";
import { useTranslation } from "next-i18next";

const useSearchOrderByOptions = () => {
  const { t } = useTranslation("excursion-management");

  const options = [
    {
      id: SearchOrderByStringEnum.CREATED_AT,
      label: t("search.filters.orderBy.1"),
    },
    {
      id: SearchOrderByStringEnum.RATING,
      label: t("search.filters.orderBy.2"),
    },
    {
      id: SearchOrderByStringEnum.TITLE,
      label: t("search.filters.orderBy.3"),
    },
  ];

  return options;
};

export default useSearchOrderByOptions;
