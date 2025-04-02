import { PlaceStatusesEnum } from "@/services/places-service/enums/place-statuses.enum";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import {
  FormProvider,
  SelectElement,
  SwitchElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
// @ts-ignore
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { StyledButton } from "@/components/UI/button/StyledButton";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import usePlaceStatuses from "@/hooks/usePlaceStatuses";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import placesService from "@/services/places-service/places.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";

interface IPlaceStatusSectionProps {
  place: IMyPlace;
  fetchPlace: () => void;
}

interface IUpdateStatusForm {
  status: PlaceStatusesEnum;
  // for all statuses
  message?: string;
  isCommercial: boolean;
  // for commercial
  advertisementEndDate?: Date | string;
}

const PlaceStatusSection = ({
  place,
  fetchPlace,
}: IPlaceStatusSectionProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const placeStatuses = usePlaceStatuses();

  const form = useForm<IUpdateStatusForm>({
    mode: "onChange",
    defaultValues: {
      status: place.status,
      message: "",
      advertisementEndDate: place.advEndDate as any,
      isCommercial: place.advertisement,
    },
  });

  const watchCommercial = form.watch("isCommercial");
  const watchStatus = form.watch("status");
  const canUpdate =
    place.status !== watchStatus ||
    place.advertisement !== watchCommercial ||
    !!form.formState.dirtyFields.advertisementEndDate;
  const filteredStatuses = placeStatuses.filter((s) => {
    if (!watchCommercial && s.id === PlaceStatusesEnum.NEEDS_PAYMENT)
      return false;
    if (!watchCommercial && s.id === PlaceStatusesEnum.COMMERCIAL_EXPIRED)
      return false;
    return true;
  });

  useEffect(() => {
    const isEmptyValue =
      filteredStatuses.findIndex((s) => s.id === watchStatus) === -1;
    if (isEmptyValue) {
      form.setValue("status", "" as any);
    }
  }, [watchCommercial]);

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (!canUpdate || loading) return;
      setLoading(true);
      placesService
        .changePlaceStatus(place.id, {
          status: data.status,
          advertisement: data.isCommercial,
          advEndDate: data.advertisementEndDate
            ? new Date(data.advertisementEndDate).toISOString()
            : undefined,
          message: data.message,
        })
        .then(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: "Статус места успешно обновлен",
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
          fetchPlace();
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Ошибка!",
                description: "Ошибка при изменении статуса места.",
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  };

  const showAdvEndDate =
    watchCommercial && watchStatus === PlaceStatusesEnum.APPROVED;

  return (
    <Paper
      sx={{
        p: "1em",
        borderRadius: "10px",
      }}
    >
      <Stack gap={"1em"}>
        <Typography
          fontWeight={600}
          fontSize={{ xs: "22px", md: "25px" }}
          gutterBottom
        >
          Изменить статус
        </Typography>
        <FormProvider {...form}>
          <Box>
            <SwitchElement label={"Коммерческое место"} name={"isCommercial"} />
          </Box>
          <Box>
            <CustomLabel htmlFor={"status"}>Новый статус</CustomLabel>
            <SelectElement
              inputProps={{ id: "status" }}
              fullWidth
              required
              name={"status"}
              options={filteredStatuses}
            />
          </Box>
          <Box>
            <CustomLabel htmlFor={"message"}>Сообщение</CustomLabel>
            <TextFieldElement
              id={"message"}
              fullWidth
              name={"message"}
              placeholder={"Сообщение пользователю"}
            />
          </Box>
          {showAdvEndDate && (
            <Box>
              <CustomLabel htmlFor={"advertisementEndDate"}>
                Дата окночнания рекламы
              </CustomLabel>
              <DatePickerElement
                disablePast
                minDate={new Date()}
                inputProps={{
                  fullWidth: true,
                  id: "advertisementEndDate",
                }}
                name={"advertisementEndDate"}
                required
              />
            </Box>
          )}
        </FormProvider>
        <Box mt={"0.5em"}>
          <StyledButton
            disabled={!canUpdate}
            size={"large"}
            startIcon={
              loading ? <CircularProgress color={"inherit"} size={22} /> : null
            }
            onClick={onSubmit}
            variant={"contained"}
            color={"primary"}
          >
            Обновить статус
          </StyledButton>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PlaceStatusSection;
