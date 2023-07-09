import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Popover,
  Stack,
  SxProps,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { CheckboxButtonGroup } from "react-hook-form-mui";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ISelect } from "@/shared/interfaces";
import usePopover from "@/hooks/usePopover";

interface IAutocompleteFilterProps {
  fieldName: string;
  options: ISelect[];
  placeholder: string;
  inputSx?: SxProps;
  startText: string;
}

function AutocompleteFilter({
  fieldName,
  options,
  inputSx,
  startText,
  placeholder,
}: IAutocompleteFilterProps) {
  const { t, i18n } = useTranslation();
  const popover = usePopover("more-filters-popover");
  const [search, setSearch] = useState("");

  const handleReset = () => {
    setSearch("");
    // onSetFormValue(fieldName, []);
  };
  const handleApply = () => {
    // onSubmit();
    popover.handleClose();
  };
  const preventIconClick = (e: any) => {
    e.preventDefault();
    return false;
  };

  const formatSelectedOptions = () => {
    const selectedIds: ISelect[] = []; // getFormValue(fieldName);
    if (selectedIds?.length === 0) return startText;
    if (selectedIds && selectedIds.length > 0 && startText)
      return `${startText} (${selectedIds.length})`;
    // return options
    //   .filter((opt) => selectedIds?.includes(opt.id))
    //   .map((x) => x.label)
    //   .join(`, `);
  };

  const containerContent = (
    <Box sx={{ padding: "30px", width: "100%" }}>
      <OutlinedInput
        placeholder={placeholder}
        fullWidth
        sx={{ mb: "0.5em" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack
        direction={"column"}
        sx={{ width: "100%" }}
        maxHeight={"255px"}
        overflow={"auto"}
      >
        <Box sx={{ "& label": { mx: 0 } }}>
          <CheckboxButtonGroup
            name={fieldName}
            options={options.filter((o) =>
              o.label.toLowerCase().startsWith(search.toLowerCase())
            )}
          />
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        gap={2}
        justifyContent="space-between"
        sx={{ width: "100%", marginTop: "20px" }}
      >
        <Button variant="text" onClick={handleReset}>
          Очистить
        </Button>
        <Button variant="contained" onClick={handleApply}>
          Применить
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box>
      <OutlinedInput
        type={"text"}
        onFocus={(event) => event.preventDefault()}
        // placeholder={small ? "Properties" : undefined}
        aria-describedby={popover.id}
        onClick={popover.handleOpen}
        inputProps={{
          onFocus: (event) => event.preventDefault(),
        }}
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "10px",
          width: "10em",
          height: "44px",
          "& input": {
            fontSize: "14px",
            py: "10.5px",
            backgroundColor: "#F6F7FF",
            cursor: "pointer",
            borderRadius: "10px",
          },
          "& fieldset": {
            border: "1px solid #E1E4F1",
            borderRadius: "10px",
          },
          "&:hover fieldset": {
            borderColor: "#0F23FB !important",
          },
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
            borderRadius: "10px",
          },
        }}
      >
        {containerContent}
      </Popover>
    </Box>
  );
}

export default AutocompleteFilter;
