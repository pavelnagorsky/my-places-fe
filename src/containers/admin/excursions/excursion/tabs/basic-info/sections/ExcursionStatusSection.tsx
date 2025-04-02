import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import {
  FormProvider,
  SelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { StyledButton } from "@/components/UI/button/StyledButton";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";
import useExcursionStatuses from "@/containers/personal-area/my-excursions/logic/utils/useExcursionStatuses";
import excursionsService from "@/services/excursions-service/excursions.service";

interface IExcursionStatusSectionProps {
  excursion: IExcursion;
  onReloadExcursion: () => void;
}

interface IUpdateStatusForm {
  status: ExcursionStatusesEnum;
  // for all statuses
  message?: string;
}

const ExcursionStatusSection = ({
  excursion,
  onReloadExcursion,
}: IExcursionStatusSectionProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const statuses = useExcursionStatuses();

  const form = useForm<IUpdateStatusForm>({
    mode: "onChange",
    defaultValues: {
      status: excursion.status,
      message: "",
    },
  });

  const watchStatus = form.watch("status");
  const canUpdate = excursion.status !== watchStatus;

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (!canUpdate || loading) return;
      setLoading(true);
      excursionsService
        .changeStatus(excursion.id, {
          status: data.status,
          message: data.message,
        })
        .then(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: "Статус экскурсии успешно обновлен",
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
          onReloadExcursion();
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Ошибка!",
                description: "Ошибка при изменении статуса экскурсии.",
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  };

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
            <CustomLabel htmlFor={"status"}>Новый статус</CustomLabel>
            <SelectElement
              inputProps={{ id: "status" }}
              fullWidth
              required
              name={"status"}
              options={statuses}
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

export default ExcursionStatusSection;
