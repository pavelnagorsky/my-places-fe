import { useTranslation } from "next-i18next";
import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import usePopover from "@/hooks/usePopover";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { CheckboxButtonGroup, useFormContext } from "react-hook-form-mui";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";
import { IExcursionsFilters } from "@/containers/excursions/logic/interfaces";
import { StyledButton } from "@/components/UI/button/StyledButton";

const AdditionalFilters = ({ onSubmit }: { onSubmit: () => void }) => {
  const { t } = useTranslation(["excursion-management", "common"]);
  const popover = usePopover("filters");
  const types = useExcursionTypes();
  const travelModes = useTravelModeOptions();
  const { resetField } = useFormContext<IExcursionsFilters>();

  const handleReset = () => {
    resetField("travelModes");
    resetField("types");
  };

  const handleApply = () => {
    popover.handleClose();
    onSubmit();
  };

  const toggle = (
    <StyledButton
      size={"large"}
      onClick={popover.handleOpen}
      variant={"contained"}
      startIcon={popover.open ? <CloseIcon /> : <TuneIcon />}
      sx={{
        fontSize: "16px",
        borderRadius: "12px",
        minWidth: { md: "150px" },
        height: "56px !important",
      }}
    >
      {t("search.filters.title")}
    </StyledButton>
  );

  return (
    <Box>
      {toggle}
      <Popover
        open={popover.open}
        onClose={popover.handleClose}
        id={popover.id}
        anchorEl={popover.anchor}
        slotProps={{
          paper: {
            sx: { borderRadius: "15px" },
          },
        }}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
      >
        <Box p={2}>
          <Stack width={"100%"} gap={2}>
            <Stack>
              <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
                {t("search.filters.type")}
              </Typography>
              <CheckboxButtonGroup name={"types"} options={types} row />
            </Stack>
            <Stack>
              <Typography fontWeight={500} fontSize={"20px"} gutterBottom>
                {t("search.filters.travelMode")}
              </Typography>
              <CheckboxButtonGroup
                name={"travelModes"}
                options={travelModes}
                row
              />
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            gap={2}
            justifyContent="space-between"
            sx={{ width: "100%", marginTop: "20px" }}
          >
            <Button variant="text" onClick={handleReset}>
              {t("buttons.clear", { ns: "common" })}
            </Button>
            <Button variant="contained" onClick={handleApply}>
              {t("buttons.apply", { ns: "common" })}
            </Button>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
};

export default AdditionalFilters;
