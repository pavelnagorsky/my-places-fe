import usePopover from "@/hooks/usePopover";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment } from "react";
import {
  CheckboxButtonGroup,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import { Button } from "@/components/UI/button/Button";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { primaryBackground, primaryColor } from "@/styles/theme/lightTheme";
import { useTranslation } from "next-i18next";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { ISearchForm } from "@/containers/search-page/interfaces";

interface IMoreFiltersPopoverProps {
  inputSx?: SxProps;
  startText: string;
  readonly categories: IPlaceCategory[];
  readonly types: IPlaceType[];
  triggerSubmit: () => void;
}

function MoreFiltersPopover({
  inputSx,
  startText,
  types,
  categories,
  triggerSubmit,
}: IMoreFiltersPopoverProps) {
  const { t } = useTranslation("searchPage");
  const form = useFormContext<ISearchForm>();

  const popover = usePopover("more-filters-popover");
  const preventIconClick = (e: any) => {
    e.preventDefault();
    return false;
  };

  const formatSelectedOptions = () => {
    const value =
      form.getValues("types").length +
      form.getValues("categories").length +
      (form.getValues("title").length > 0 ? 1 : 0);
    return `${startText} ${value > 0 ? `(${value})` : ""}`;
  };

  const onSubmit = () => {
    popover.handleClose();
    triggerSubmit();
  };

  const onClear = () => {
    form.resetField("title");
    form.resetField("categories");
    form.resetField("types");
  };

  const containerContent = (
    <Fragment>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"baseline"}
        mt={"-0.5em"}
        mb={"0.8em"}
      >
        <Typography fontSize={"18px"} component={"p"}>
          {t("filters.searchByTitle")}
        </Typography>
        <IconButton onClick={popover.handleClose}>
          <ClearIcon />
        </IconButton>
      </Stack>
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
      <Box maxHeight={"400px"} overflow={"auto"} pb={"0.2em"}>
        <Typography fontSize={"18px"} component={"p"} mb={"0.8em"} mt={"0.5em"}>
          {t("filters.types")}
        </Typography>
        <Box width={"100%"}>
          <CheckboxButtonGroup
            labelProps={{
              sx: {
                width: "49%",
                wordWrap: "break-word",
                overflow: "hidden",
                mx: 0,
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
        <Divider variant={"middle"} />
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
                wordWrap: "break-word",
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
          {t("filters.clear")}
        </Button>
        <Button variant={"contained"} type={"submit"} onClick={onSubmit}>
          {t("filters.apply")}
        </Button>
      </Stack>
    </Fragment>
  );

  return (
    <Box>
      <TextField
        type={"text"}
        onFocus={(event) => event.preventDefault()}
        // placeholder
        aria-describedby={popover.id}
        onClick={popover.handleOpen}
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
      <Popover
        id={popover.id}
        open={popover.open}
        anchorEl={popover.anchor}
        onClose={popover.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            px: "1em",
            pt: "1.5em",
            pb: "0.5em",
            borderRadius: "10px",
            maxWidth: "450px",
          },
        }}
      >
        {containerContent}
      </Popover>
    </Box>
  );
}

export default MoreFiltersPopover;
