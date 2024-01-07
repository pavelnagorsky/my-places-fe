import {
  CheckboxButtonGroup,
  DatePickerElement,
  useFormContext,
} from "react-hook-form-mui";
import { forwardRef, ReactElement, Ref, useMemo, useState } from "react";
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
import { TransitionProps } from "@mui/material/transitions/transition";
import useReviewStatuses from "@/hooks/useReviewStatuses";
import { IMyReviewsFormContext } from "@/containers/personal-area/my-reviews/interfaces";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";

interface IAdditionalFiltersProps {
  onSubmit: () => void;
  type: "reviews" | "places";
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdditionalFilters = ({ onSubmit, type }: IAdditionalFiltersProps) => {
  const { resetField, watch, getValues } = useFormContext<
    IMyPlacesFormContext | IMyReviewsFormContext
  >();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const placeStatuses = usePlaceStatuses();
  const reviewStatuses = useReviewStatuses();
  const statuses = type === "places" ? placeStatuses : reviewStatuses;
  const [open, setOpen] = useState(false);

  const watchEndDate = watch("dateTo");

  const filtersCount = useMemo(() => {
    const statusesCount = getValues("statuses")?.length || 0;
    const dateFromCount = getValues("dateFrom") !== null ? 1 : 0;
    const dateEndCount = getValues("dateTo") !== null ? 1 : 0;
    return statusesCount + dateEndCount + dateFromCount;
  }, [open]);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onApply = () => {
    onClose();
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
          onClick={onOpen}
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
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
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
          <Typography mx={"auto"} fontWeight={700} fontSize={"20px"}>
            Фильтры
          </Typography>
          <IconButton onClick={onClose} sx={{ mr: "0.2em" }}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box p={"2em"} pt={"1.5em"}>
          <CustomLabel sx={{ fontSize: "18px" }}>По статусу</CustomLabel>
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
                  localeText={{
                    previousMonth: "Прошлый месяц",
                    nextMonth: "Следующий месяц",
                    toolbarTitle: "Выберите дату",
                    okButtonLabel: "Выбрать",
                    cancelButtonLabel: "Отменить",
                  }}
                />
              </Box>
              <Box>
                <CustomLabel>До</CustomLabel>
                <DatePickerElement
                  name={"dateTo"}
                  isDate
                  maxDate={new Date()}
                  format={"dd MMM yyyy"}
                  localeText={{
                    previousMonth: "Прошлый месяц",
                    nextMonth: "Следующий месяц",
                    toolbarTitle: "Выберите дату",
                    okButtonLabel: "Выбрать",
                    cancelButtonLabel: "Отменить",
                  }}
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
