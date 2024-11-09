import {
  CheckboxButtonGroup,
  SwitchElement,
  useFormContext,
} from "react-hook-form-mui";
// @ts-ignore
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { useTranslation } from "next-i18next";
import {
  Badge,
  Box,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useDialog from "@/hooks/useDialog";
import { useMemo } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import FilterTransition from "@/components/UI/transitions/FilterTransition";
import { primaryBackground } from "@/styles/theme/lightTheme";
import CloseIcon from "@mui/icons-material/Close";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { Button } from "@/components/UI/button/Button";
import { IFeedbackListFiltersForm } from "@/containers/admin/feedback-list/interfaces";
import useCrmStatuses from "@/hooks/useCrmStatuses";
import useUserTypes from "@/containers/contact-us/form/user-types/useUserTypes";

const AdditionalFilters = ({ onSubmit }: { onSubmit: () => void }) => {
  const { resetField, watch, getValues } =
    useFormContext<IFeedbackListFiltersForm>();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dialog = useDialog();
  const { statuses } = useCrmStatuses();
  const requestTypes = useUserTypes();

  const watchEndDate = watch("dateTo");

  const filtersCount = useMemo(() => {
    const data = getValues();
    let count = 0;
    if (data.dateFrom) count += 1;
    if (data.dateTo) count += 1;
    if (data.requestTypes.length > 0) count += 1;
    if (data.statuses.length > 0) count += 1;
    return count;
  }, [dialog.open]);

  const onApply = () => {
    dialog.handleClose();
    onSubmit();
  };

  const onClear = () => {
    resetField("requestTypes");
    resetField("dateFrom");
    resetField("dateTo");
    resetField("statuses");
  };

  return (
    <Box>
      <Badge badgeContent={filtersCount} color={"primary"}>
        <IconButton
          color={"secondary"}
          onClick={dialog.handleOpen}
          sx={{
            backgroundColor: "white",
            p: "0.5em",
            borderRadius: "10px",
            boxShadow: "rgba(32, 31, 61, 0.15) 0px 5px 10px",
          }}
        >
          <TuneIcon color={"secondary"} />
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
            Фильтры
          </Typography>
          <IconButton onClick={dialog.handleClose} sx={{ mr: "0.2em" }}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box p={"2em"} pt={"1.5em"}>
          <Stack gap={"1em"}>
            <Box>
              <CustomLabel sx={{ fontSize: "18px" }}>По статусу</CustomLabel>
              <Box
                sx={{
                  "& label": { color: "secondary.main", width: "50%", mx: 0 },
                }}
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
            </Box>
            <Box>
              <CustomLabel sx={{ fontSize: "18px" }}>
                По типу запроса
              </CustomLabel>
              <Box
                sx={{
                  "& label": { color: "secondary.main", width: "50%", mx: 0 },
                }}
                display={"flex"}
              >
                <CheckboxButtonGroup
                  options={requestTypes}
                  name={"requestTypes"}
                  row
                />
              </Box>
            </Box>
          </Stack>
          <Divider sx={{ my: "1.5em" }} />
          <Box>
            <CustomLabel sx={{ fontSize: "18px" }}>
              По дате создания
            </CustomLabel>
            <Typography color={"secondary.main"}>
              Выберите промежуток дат
            </Typography>
            <Stack
              direction={"row"}
              mt={"1em"}
              gap={"1em"}
              justifyContent={"space-between"}
            >
              <Box>
                <CustomLabel>От</CustomLabel>
                <DatePickerElement
                  name={"dateFrom"}
                  isDate
                  maxDate={watchEndDate || new Date()}
                  format={"dd MMM yyyy"}
                />
              </Box>
              <Box>
                <CustomLabel>До</CustomLabel>
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
            <Button onClick={onClear}>Очистить</Button>
            <Button onClick={onApply} variant={"contained"}>
              Применить
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdditionalFilters;
