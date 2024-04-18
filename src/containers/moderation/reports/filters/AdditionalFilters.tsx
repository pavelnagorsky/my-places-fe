import {
  CheckboxButtonGroup,
  DatePickerElement,
  useFormContext,
} from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
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
import { useMemo } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { primaryBackground } from "@/styles/theme/lightTheme";
import CloseIcon from "@mui/icons-material/Close";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { Button } from "@/components/UI/button/Button";
import useCrmStatuses from "@/hooks/useCrmStatuses";
import { IReportsFormContext } from "@/containers/moderation/reports/interfaces";
import useDialog from "@/hooks/useDialog";
import FilterTransition from "@/components/UI/transitions/FilterTransition";

interface IFilterProps {
  onSubmit: () => void;
}

const AdditionalFilters = ({ onSubmit }: IFilterProps) => {
  const { resetField, watch, getValues } =
    useFormContext<IReportsFormContext>();
  const { t } = useTranslation(["moderation", "common"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { statuses } = useCrmStatuses();
  const dialog = useDialog();

  const watchEndDate = watch("dateTo");

  const filtersCount = useMemo(() => {
    const statusesCount = getValues("statuses")?.length || 0;
    const dateFromCount = getValues("dateFrom") !== null ? 1 : 0;
    const dateEndCount = getValues("dateTo") !== null ? 1 : 0;
    return statusesCount + dateEndCount + dateFromCount;
  }, [dialog.open]);

  const onApply = () => {
    dialog.handleClose();
    onSubmit();
  };

  const onClear = () => {
    resetField("statuses");
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
          <CustomLabel sx={{ fontSize: "18px" }}>
            {t("reports.filters.byStatus")}
          </CustomLabel>
          <Box
            sx={{ "& label": { color: "secondary.main", width: "50%", mx: 0 } }}
            display={"flex"}
          >
            <CheckboxButtonGroup
              options={statuses.map((s) => ({
                id: `${s.id}`,
                label: s.label,
              }))}
              name={"statuses"}
              row
            />
          </Box>
          <Divider sx={{ my: "1.5em" }} />
          <Box>
            <CustomLabel sx={{ fontSize: "18px" }}>
              {t("reports.filters.byCreatedAt")}
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
