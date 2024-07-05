import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  SwipeableDrawer,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  CheckboxButtonGroup,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { memo } from "react";
import LocationAutocomplete from "@/containers/search-page/filters/LocationAutocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import { primaryBackground, primaryColor } from "@/styles/theme/lightTheme";
import RadiusFilter from "@/containers/search-page/filters/RadiusFilter";
import { Button } from "@/components/UI/button/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "next-i18next";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { ISearchForm } from "@/containers/search-page/interfaces";
import useDialog from "@/hooks/useDialog";
import { defaultSearchFilters } from "../../usePlacesSearch";

interface IMoreFiltersPopoverProps {
  startText: string;
  readonly categories: IPlaceCategory[];
  readonly types: IPlaceType[];
  triggerSubmit: () => void;
  inputSx?: SxProps;
}

const MobileFiltersPopover = ({
  startText,
  types,
  categories,
  triggerSubmit,
  inputSx,
}: IMoreFiltersPopoverProps) => {
  const { t } = useTranslation(["search", "common"]);
  const form = useFormContext<ISearchForm>();

  const drawer = useDialog();
  const preventIconClick = (e: any) => {
    e.preventDefault();
    return false;
  };

  const formatSelectedOptions = () => {
    const value =
      form.getValues("types").length +
      form.getValues("categories").length +
      (form.getValues("title").length > 0 ? 1 : 0) +
      (form.getValues("locationTitle")?.length > 0 ? 1 : 0) +
      (form.getValues("searchByMe") === true ? 1 : 0);
    return `${startText} ${value > 0 ? `(${value})` : ""}`;
  };

  const onSubmit = () => {
    drawer.handleClose();
    triggerSubmit();
  };

  const onClear = () => {
    form.resetField("title", {
      defaultValue: defaultSearchFilters.title,
    });
    form.resetField("categories", {
      defaultValue: defaultSearchFilters.categories,
    });
    form.resetField("types", {
      defaultValue: defaultSearchFilters.types,
    });
    form.resetField("radius", {
      defaultValue: defaultSearchFilters.radius,
    });
    form.resetField("searchByMe", {
      defaultValue: defaultSearchFilters.searchByMe,
    });
    form.setValue("search", null);
    form.setValue("locationTitle", "");
    form.setValue("locationInputValue", "");
  };

  const content = (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"baseline"}
        mt={"-0.5em"}
        mb={"0.5em"}
      >
        <Typography fontSize={"18px"} mb={"1em"} component={"p"}>
          {t("filters.selectPlace")}
        </Typography>
        <IconButton onClick={drawer.handleClose}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <LocationAutocomplete />

      <Divider
        variant={"middle"}
        sx={{ borderColor: primaryBackground, mt: "0.5em", mb: "1em" }}
      />

      <Typography fontSize={"18px"} mb={"1em"} component={"p"}>
        {t("filters.searchRadius")}
      </Typography>
      <RadiusFilter searchByMeSx={{ justifyContent: "start", mt: "-0.5em" }} />

      <Divider
        variant={"middle"}
        sx={{ borderColor: primaryBackground, mt: "0.5em", mb: "1em" }}
      />

      <Typography fontSize={"18px"} mb={"1em"} component={"p"}>
        {t("filters.searchByTitle")}
      </Typography>
      <TextFieldElement
        sx={{
          width: "100%",
          mb: "1em",
        }}
        name={"title"}
        placeholder={t("filters.enterTitle")}
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <IconButton>
                <SearchIcon color={"disabled"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Divider
        variant={"middle"}
        sx={{ borderColor: primaryBackground, mt: "0.5em", mb: "1em" }}
      />

      <Typography fontSize={"18px"} component={"p"} mb={"0.8em"} mt={"0.5em"}>
        {t("filters.types")}
      </Typography>
      <Box width={"100%"}>
        <CheckboxButtonGroup
          labelProps={{
            sx: {
              width: "49%",
              mx: 0,
              wordBreak: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
              overflow: "hidden",
              marginInlineEnd: "0.5px",
              "& span:first-of-type": {
                color: "primary.light",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              },
            },
          }}
          row
          options={types.map((type) => ({
            id: type.id,
            label: type.title,
          }))}
          name={"types"}
        />
      </Box>
      <Divider
        variant={"middle"}
        sx={{ borderColor: primaryBackground, mt: "0.5em", mb: "1em" }}
      />
      <Typography fontSize={"18px"} component={"p"} mb={"0.8em"}>
        {t("filters.categories")}
      </Typography>
      <Box width={"100%"} mb={"1em"}>
        <CheckboxButtonGroup
          row
          labelProps={{
            sx: {
              width: "49%",
              mx: 0,
              wordBreak: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
              overflow: "hidden",
              marginInlineEnd: "0.5px",
              "& span:first-of-type": {
                color: "primary.light",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              },
            },
          }}
          options={categories.map((category) => ({
            id: category.id,
            label: category.title,
          }))}
          name={"categories"}
        />
      </Box>
      <Divider
        variant={"middle"}
        sx={{ borderColor: primaryBackground, height: "0.5px" }}
      />
      <Stack
        bottom={"-0.5em"}
        position={"sticky"}
        bgcolor={"white"}
        direction={"row"}
        gap={"0.5em"}
        p={"1em"}
        zIndex={10}
        justifyContent={"space-between"}
      >
        <Button sx={{ color: primaryColor }} onClick={onClear}>
          {t("buttons.clear", { ns: "common" })}
        </Button>
        <Button variant={"contained"} type={"submit"} onClick={onSubmit}>
          {t("buttons.apply", { ns: "common" })}
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box>
      <TextField
        type={"text"}
        onFocus={(event) => event.preventDefault()}
        // placeholder
        aria-describedby={"more-filters-mobile-popover"}
        onClick={drawer.handleOpen}
        inputProps={{
          "aria-readonly": true,
          onFocus: (event) => event.preventDefault(),
        }}
        sx={{
          "& .MuiInputBase-root, input": { cursor: "pointer" },
          bgcolor: "white",
          ...inputSx,
        }}
        value={formatSelectedOptions()}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment
              position="end"
              disablePointerEvents={true}
              sx={{ marginInlineStart: "0px" }}
            >
              <IconButton edge="end" onMouseDown={preventIconClick}>
                <KeyboardArrowDownIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <SwipeableDrawer
        id={drawer.open ? "more-filters-mobile-popover" : undefined}
        ModalProps={{
          keepMounted: false,
        }}
        PaperProps={{
          sx: {
            px: "1em",
            pt: "1.5em",
            pb: "0.5em",
            width: "100%",
            // maxWidth: "350px",
          },
        }}
        anchor={"bottom"}
        open={drawer.open}
        onClose={drawer.handleClose}
        onOpen={drawer.handleOpen}
      >
        {content}
      </SwipeableDrawer>
    </Box>
  );
};

export default memo(MobileFiltersPopover);
