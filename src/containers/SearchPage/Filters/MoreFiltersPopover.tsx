import usePopover from "@/hooks/usePopover";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popover,
  Stack,
  SxProps,
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
import { Button } from "@/components/UI/Button/Button";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { ISearchForm } from "@/containers/SearchPage/Filters/FormContainer";

interface IMoreFiltersPopoverProps {
  inputSx?: SxProps;
  startText: string;
  readonly categories: IPlaceCategory[];
  readonly types: IPlaceType[];
}

function MoreFiltersPopover({
  inputSx,
  startText,
  types,
  categories,
}: IMoreFiltersPopoverProps) {
  const { resetField } = useFormContext<ISearchForm>();

  const popover = usePopover("more-filters-popover");
  const preventIconClick = (e: any) => {
    e.preventDefault();
    return false;
  };

  const formatSelectedOptions = () => {
    return startText;
  };

  const containerContent = (
    <Fragment>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={"0.8em"}
      >
        <Typography fontSize={"18px"} component={"p"}>
          Искать по названию
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
        placeholder={"Введите название"}
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography fontSize={"18px"} component={"p"} mb={"0.8em"} mt={"0.5em"}>
        Типы достопримечательностей
      </Typography>
      <Box width={"100%"}>
        <CheckboxButtonGroup
          labelProps={{
            sx: {
              width: "49%",
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
        Категории
      </Typography>
      <Box width={"100%"}>
        <CheckboxButtonGroup
          row
          labelProps={{
            sx: {
              width: "49%",
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
          options={categories.map((category) => ({
            id: category.id,
            label: category.title,
          }))}
          name={"categories"}
        />
      </Box>
      <Divider variant={"middle"} />
      <Stack
        direction={"row"}
        gap={"1em"}
        mt={"1.5em"}
        justifyContent={"space-between"}
      >
        <Button sx={{ fontWeight: 400 }}>Очистить</Button>
        <Button sx={{ fontWeight: 400 }}>Применить</Button>
      </Stack>
    </Fragment>
  );

  return (
    <Box>
      <OutlinedInput
        type={"text"}
        onFocus={(event) => event.preventDefault()}
        // placeholder
        aria-describedby={popover.id}
        onClick={popover.handleOpen}
        inputProps={{
          onFocus: (event) => event.preventDefault(),
        }}
        sx={{
          "& input": { cursor: "pointer" },
          ...inputSx,
        }}
        readOnly
        value={formatSelectedOptions()}
        endAdornment={
          <InputAdornment
            position="end"
            disablePointerEvents={true}
            sx={{ marginInlineStart: "0px" }}
          >
            <IconButton edge="end" onMouseDown={preventIconClick}>
              <KeyboardArrowDownIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
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
            py: "1.5em",
            borderRadius: "10px",
            maxWidth: "350px",
          },
        }}
      >
        {containerContent}
      </Popover>
    </Box>
  );
}

export default MoreFiltersPopover;
