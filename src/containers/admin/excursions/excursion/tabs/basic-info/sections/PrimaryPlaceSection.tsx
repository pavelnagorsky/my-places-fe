import {
  AutocompleteElement,
  FormProvider,
  useForm,
} from "react-hook-form-mui";
import excursionsService from "@/services/excursions-service/excursions.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { StyledButton } from "@/components/UI/button/StyledButton";
import { ISelect } from "@/shared/interfaces";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";

const PrimaryPlaceSection = ({ excursion }: { excursion: IExcursion }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const primaryPlace = excursion.places.find((p) => p.isPrimary);
  const form = useForm<{ place: ISelect }>({
    mode: "onChange",
    defaultValues: {
      place: primaryPlace
        ? { id: primaryPlace.excursionPlaceId, label: primaryPlace.title }
        : (null as any),
    },
  });

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      excursionsService
        .setExcursionPrimaryPlace(excursion.id, data.place.id)
        .then(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: "Ключевое место экскурсии обновлено",
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Ошибка!",
                description: "Ошибка при обновлении ключевого места экскурсии",
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
          Ключевое место
        </Typography>
        <FormProvider {...form}>
          <Box>
            <CustomLabel htmlFor={"place"}>Выберите место</CustomLabel>
            <AutocompleteElement
              required
              autocompleteProps={{
                fullWidth: true,
              }}
              textFieldProps={{ placeholder: "Выберите место" }}
              name={"place"}
              options={excursion.places.map((p) => ({
                id: p.excursionPlaceId,
                label: p.title,
              }))}
            />
          </Box>
        </FormProvider>
        <Box mt={"0.5em"}>
          <StyledButton
            disabled={!form.formState.isValid}
            size={"large"}
            startIcon={
              loading ? <CircularProgress color={"inherit"} size={22} /> : null
            }
            onClick={onSubmit}
            variant={"contained"}
            color={"primary"}
          >
            Сохранить
          </StyledButton>
        </Box>
      </Stack>
    </Paper>
  );
};

export default PrimaryPlaceSection;
