import { SearchOrderByStringEnum } from "@/containers/search-page/logic/interfaces";
import { useTranslation } from "next-i18next";

const useSearchOrderByOptions = () => {
  const { t } = useTranslation("search");

  const options = [
    {
      id: SearchOrderByStringEnum.CREATED_AT,
      label: t("filters.orderBy.1"),
    },
    {
      id: SearchOrderByStringEnum.RATING,
      label: t("filters.orderBy.2"),
    },
    {
      id: SearchOrderByStringEnum.TITLE,
      label: t("filters.orderBy.3"),
    },
  ];

  return options;
};

export default useSearchOrderByOptions;
