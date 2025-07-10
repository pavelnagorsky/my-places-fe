import {
  Box,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckboxButtonGroup } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store/hooks";
import {
  selectPlaceCategoriesOptions,
  selectPlaceTypesOptions,
} from "@/store/search-slice/search.slice";
import filtersIcon from "../../../../../../public/images/icons/filters.svg";
import TextFilter from "@/containers/places/content/filters/content/TextFilter";

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
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Stack gap={"1.5em"}>
      <Stack direction={"row"} gap={"0.7em"} alignItems={"center"}>
        <Typography fontSize={"20px"} fontWeight={500}>
          {t("filters.filters")}
        </Typography>
        <Box component={"img"} src={filtersIcon.src} sx={{}} />
      </Stack>
      <Stack gap={"1em"}>
        {!isLaptop && <TextFilter sx={{ mb: "1em" }} />}
        <div>
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
        </div>
      </Stack>
      <Stack>
        <div>
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
        </div>
      </Stack>
    </Stack>
  );
};

export default TypesAndCategoriesFilter;
