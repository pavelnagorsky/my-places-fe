import {
  Box,
  Divider,
  Icon,
  Stack,
  SvgIcon,
  SxProps,
  Typography,
} from "@mui/material";
import { CheckboxButtonGroup, useFormContext } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { ISearchForm } from "@/containers/search-page/logic/interfaces";
import { useAppSelector } from "@/store/hooks";
import {
  selectPlaceCategoriesOptions,
  selectPlaceTypesOptions,
} from "@/store/search-slice/search.slice";
import filtersIcon from "../../../../../../public/images/icons/filters.svg";
import TitleFilter from "@/containers/search-page/content/filters/content/TitleFilter";
import DescriptionFilter from "@/containers/search-page/content/filters/content/DescriptionFilter";

const checkboxesLabelSx: SxProps = {
  width: "49%",
  wordBreak: "break-word",
  wordWrap: "break-word",
  hyphens: "auto",
  overflow: "hidden",
  mx: 0,
  marginInlineEnd: "0.5px",
  "& span:first-of-type": {
    color: "primary.light",
    "&.Mui-checked": {
      color: "primary.main",
    },
  },
};

const TypesAndCategoriesFilter = () => {
  const { t } = useTranslation(["search", "common"]);
  const types = useAppSelector(selectPlaceTypesOptions);
  const categories = useAppSelector(selectPlaceCategoriesOptions);

  return (
    <Stack gap={"1em"}>
      <Stack direction={"row"} gap={"0.7em"} alignItems={"center"}>
        <Typography fontSize={"20px"} fontWeight={500}>
          {t("filters.filters")}
        </Typography>
        <Box component={"img"} src={filtersIcon.src} sx={{}} />
      </Stack>
      <Stack>
        <TitleFilter />
        <DescriptionFilter />
        <Typography fontSize={"18px"} mb={"0.5em"}>
          {t("filters.types")}
        </Typography>
        <CheckboxButtonGroup
          labelProps={{
            sx: checkboxesLabelSx,
          }}
          row
          options={types}
          name={"types"}
        />
      </Stack>
      <Stack>
        <Typography fontSize={"18px"} mb={"0.5em"}>
          {t("filters.categories")}
        </Typography>
        <CheckboxButtonGroup
          row
          labelProps={{
            sx: checkboxesLabelSx,
          }}
          options={categories}
          name={"categories"}
        />
      </Stack>
    </Stack>
  );
};

export default TypesAndCategoriesFilter;
