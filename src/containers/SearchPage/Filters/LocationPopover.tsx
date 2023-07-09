import usePopover from "@/hooks/usePopover";
import {
  CheckboxElement,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
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
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@/components/UI/Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LocationAutocomplete } from "@/containers/SearchPage/Filters/LocationAutocomplete";
import { primaryBackground, primaryColor } from "@/styles/theme/lightTheme";
import { ISearchForm } from "@/hoc/WithSearch";

interface ILocationPopoverProps {
  inputSx?: SxProps;
  startText: string;
  triggerSubmit: () => void;
}

function LocationPopover({
  inputSx,
  startText,
  triggerSubmit,
}: ILocationPopoverProps) {
  const popover = usePopover("location-popover");
  const preventIconClick = (e: any) => {
    e.preventDefault();
    return false;
  };

  const form = useFormContext<ISearchForm>();

  const onSubmit = () => {
    triggerSubmit();
    popover.handleClose();
  };

  const onClear = () => {
    form.resetField("search");
    form.setValue("locationTitle", "");
    form.setValue("locationInputValue", "");
  };

  const formatSelectedOptions = () => {
    const value = form.getValues("locationTitle");
    return value || startText;
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
          Выберите место
        </Typography>
        <IconButton onClick={popover.handleClose}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <LocationAutocomplete />

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

export default LocationPopover;
