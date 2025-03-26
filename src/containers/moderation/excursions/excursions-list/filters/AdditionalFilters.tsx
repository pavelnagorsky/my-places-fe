import { CheckboxButtonGroup, useFormContext } from "react-hook-form-mui";
// @ts-ignore
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { useMemo } from "react";
import {
  Badge,
  Box,
  Dialog,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { IMyPlacesFormContext } from "@/containers/personal-area/my-places/interfaces";
import usePlaceStatuses from "@/hooks/usePlaceStatuses";
import TuneIcon from "@mui/icons-material/Tune";
import { Button } from "@/components/UI/button/Button";
import useReviewStatuses from "@/hooks/useReviewStatuses";
import { IMyReviewsFormContext } from "@/containers/personal-area/my-reviews/interfaces";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import useDialog from "@/hooks/useDialog";
import FilterTransition from "@/components/UI/transitions/FilterTransition";
import { IMyRoutesFormContext } from "@/containers/personal-area/my-routes/interfaces";

interface IAdditionalFiltersProps {
  onSubmit: () => void;
}

const AdditionalFilters = ({ onSubmit }: IAdditionalFiltersProps) => {
  const { resetField, watch, getValues } =
    useFormContext<IMyRoutesFormContext>();
  const { t } = useTranslation(["moderation", "common"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dialog = useDialog();

  const watchEndDate = watch("dateTo");

  const filtersCount = useMemo(() => {
    const dateFromCount = getValues("dateFrom") !== null ? 1 : 0;
    const dateEndCount = getValues("dateTo") !== null ? 1 : 0;
    return dateEndCount + dateFromCount;
  }, [dialog.open]);

  const onApply = () => {
    dialog.handleClose();
    onSubmit();
  };

  const onClear = () => {
    resetField("dateFrom");
    resetField("dateTo");
  };

  return (
    <Box>
      <Badge badgeContent={filtersCount} color={"primary"}>
        <IconButton
          onClick={dialog.handleOpen}
          sx={{
            p: "0.5em",
            borderRadius: "10px",
            boxShadow: "rgba(32, 31, 61, 0.15) 0px 5px 10px",
          }}
        >
          <TuneIcon color={"primary"} />
        </IconButton>
      </Badge>
      <Dialog
        open={dialog.open}
        onClose={dialog.handleClose}
        TransitionComponent={FilterTransition}
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: { md: "10px" },
          },
        }}
      >
        <Stack
          position={"sticky"}
          py={"0.5em"}
          // pl={"2em"}
          // pr={"0.2em"}
          top={0}
          zIndex={1}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ backgroundColor: primaryBackground }}
          alignItems={"center"}
        >
          <Typography mx={"auto"} fontWeight={600} fontSize={"20px"}>
            {t("filters.title", { ns: "common" })}
          </Typography>
          <IconButton onClick={dialog.handleClose} sx={{ mr: "0.2em" }}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box p={"2em"} pt={"1.5em"}>
          <Box>
            <CustomLabel sx={{ fontSize: "18px" }}>
              {t("excursions.filters.byCreatedAt")}
            </CustomLabel>
            <Typography color={"secondary.main"}>
              {t("filters.dateRange", { ns: "common" })}
            </Typography>
            <Stack
              direction={"row"}
              mt={"1em"}
              gap={"1em"}
              justifyContent={"space-between"}
            >
              <Box>
                <CustomLabel>{t("filters.from", { ns: "common" })}</CustomLabel>
                <DatePickerElement
                  name={"dateFrom"}
                  isDate
                  maxDate={watchEndDate || new Date()}
                  format={"dd MMM yyyy"}
                />
              </Box>
              <Box>
                <CustomLabel>{t("filters.to", { ns: "common" })}</CustomLabel>
                <DatePickerElement
                  name={"dateTo"}
                  isDate
                  maxDate={new Date()}
                  format={"dd MMM yyyy"}
                />
              </Box>
            </Stack>
          </Box>
          <Divider sx={{ my: "2em" }} />
          <Stack direction={"row"} justifyContent={"space-between"} gap={"1em"}>
            <Button onClick={onClear}>
              {t("buttons.clear", { ns: "common" })}
            </Button>
            <Button onClick={onApply} variant={"contained"}>
              {t("buttons.apply", { ns: "common" })}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdditionalFilters;
