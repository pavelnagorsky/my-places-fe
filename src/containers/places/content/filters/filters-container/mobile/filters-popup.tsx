import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form-mui";
import { ISearchForm } from "@/containers/places/logic/interfaces";
import useDialog from "@/hooks/useDialog";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationSearch from "@/containers/places/content/filters/content/location-search/LocationSearch";
import RadiusFilter from "@/containers/places/content/filters/content/RadiusFilter";
import TypesAndCategoriesFilter from "@/containers/places/content/filters/content/TypesAndCategoriesFilter";
import { Button } from "@/components/UI/button/Button";
import { primaryColor } from "@/styles/theme/lightTheme";
import { defaultSearchFilters } from "@/containers/places/logic/default-filters";

const FiltersPopup = ({ triggerSubmit }: { triggerSubmit: () => void }) => {
  const { t } = useTranslation(["search", "common"]);
  const { reset, getValues } = useFormContext<ISearchForm>();

  const drawer = useDialog();

  const formatSelectedOptions = () => {
    const value =
      getValues("types").length +
      getValues("categories").length +
      (getValues("search").length > 0 ? 1 : 0) +
      (getValues("locationStartCoordinates") ? 1 : 0) +
      (getValues("locationEndCoordinates") ? 1 : 0);
    return `${t("filters.filters")} ${value > 0 ? `(${value})` : ""}`;
  };

  const onSubmit = () => {
    drawer.handleClose();
    triggerSubmit();
  };

  const onClear = () => {
    reset(defaultSearchFilters);
  };

  const content = (
    <Box>
      <Stack
        py={"1em"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"sticky"}
        bgcolor={"white"}
        top={0}
        zIndex={10}
      >
        <Typography fontSize={"20px"} fontWeight={700}>
          {t("filters.filters")}
        </Typography>
        <IconButton onClick={drawer.handleClose}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Stack gap={"1em"}>
        <LocationSearch />
        <RadiusFilter />
        <TypesAndCategoriesFilter />
      </Stack>
      <Stack
        bottom={0}
        position={"sticky"}
        bgcolor={"white"}
        direction={"row"}
        gap={"1em"}
        py={"1em"}
        zIndex={10}
      >
        <Button fullWidth sx={{ color: primaryColor }} onClick={onClear}>
          {t("buttons.clear", { ns: "common" })}
        </Button>
        <Button
          fullWidth
          variant={"contained"}
          type={"submit"}
          onClick={onSubmit}
        >
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
        aria-describedby={"more-filters-mobile-popover"}
        onClick={drawer.handleOpen}
        sx={{
          "& .MuiInputBase-root, input": { cursor: "pointer" },
          bgcolor: "white",
        }}
        value={formatSelectedOptions()}
        slotProps={{
          htmlInput: {
            "aria-readonly": true,
          },
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment
                position="end"
                disablePointerEvents={true}
                sx={{ marginInlineStart: "0px" }}
              >
                <IconButton edge="end">
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
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
            width: "100%",
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

export default FiltersPopup;
