import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Popover,
  Slider,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import usePopover from "@/hooks/usePopover";
import ClearIcon from "@mui/icons-material/Clear";
import {
  CheckboxElement,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import { Button } from "@/components/UI/Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { primaryBackground, primaryColor } from "@/styles/theme/lightTheme";
import { ISearchForm } from "@/hoc/WithSearch";

interface IRadiusSelectProps {
  readonly maxValue: number;
  inputSx?: SxProps;
  startText: string;
  triggerSubmit: () => void;
}

export function RadiusPopover({
  maxValue,
  inputSx,
  startText,
  triggerSubmit,
}: IRadiusSelectProps) {
  const popover = usePopover("radius-popover");
  const preventIconClick = (e: any) => {
    e.preventDefault();
    return false;
  };

  const form = useFormContext<ISearchForm>();

  const radius = form.watch("radius");

  const onSubmit = () => {
    triggerSubmit();
    popover.handleClose();
  };

  const formatSelectedOptions = () => {
    const value = form.getValues("radius");
    return `${startText} (${value} км)`;
  };

  function valueText(value: number) {
    return `${value} km`;
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") form.setValue("radius", newValue);
  };

  const onClear = () => {
    form.resetField("radius");
    form.resetField("searchByMe");
  };

  const containerContent = (
    <Box width={"100%"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"baseline"}
        mt={"-0.5em"}
        mb={"0.8em"}
      >
        <Typography fontSize={"18px"} component={"p"}>
          Радиус поиска локации
        </Typography>
        <IconButton onClick={popover.handleClose}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Stack
        direction={"row"}
        gap={"1em"}
        mb={"0.5em"}
        alignItems={"flex-start"}
      >
        <Box sx={{ width: "100%" }}>
          <Slider
            value={typeof radius === "number" ? radius : 0}
            onChange={handleSliderChange}
            aria-label="search-distance"
            getAriaValueText={valueText}
            step={10}
            max={maxValue}
            valueLabelDisplay="auto"
          />
        </Box>
        <TextFieldElement
          type={"number"}
          name={"radius"}
          variant={"standard"}
          sx={{
            maxWidth: "5em",
          }}
          InputProps={{
            size: "small",
            endAdornment: <InputAdornment position="end">км</InputAdornment>,
          }}
          onChange={(event) => {
            const isNumber =
              event.target.value.length > 0 &&
              typeof +event.target.value === "number";
            form.setValue("radius", isNumber ? +event.target.value : 1);
          }}
          inputProps={{
            inputMode: "numeric",
            step: 10,
            max: maxValue,
            "aria-labelledby": "search-distance",
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        sx={{ "& label": { ml: 0 } }}
      >
        <CheckboxElement
          sx={{ color: "primary.light" }}
          inputProps={{ "aria-label": "Search by me enabled" }}
          name={"searchByMe"}
          label={"Поиск от моего местоположения"}
        />
      </Stack>
      <Divider
        variant={"middle"}
        sx={{ borderColor: primaryBackground, height: "0.5px" }}
      />
      <Stack
        direction={"row"}
        gap={"0.5em"}
        mt={"1em"}
        px={"1em"}
        justifyContent={"space-between"}
      >
        <Button sx={{ fontWeight: 400, color: primaryColor }} onClick={onClear}>
          Очистить
        </Button>
        <Button
          sx={{ fontWeight: 400, color: "white" }}
          variant={"contained"}
          type={"submit"}
          onClick={onSubmit}
        >
          Применить
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
        aria-describedby={popover.id}
        onClick={popover.handleOpen}
        inputProps={{
          "aria-readonly": true,
          onFocus: (event) => event.preventDefault(),
        }}
        sx={{
          "& input": { cursor: "pointer" },
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
            px: "1.5em",
            py: "1.5em",
            borderRadius: "10px",
            maxWidth: "385px",
          },
        }}
      >
        {containerContent}
      </Popover>
    </Box>
  );
}
