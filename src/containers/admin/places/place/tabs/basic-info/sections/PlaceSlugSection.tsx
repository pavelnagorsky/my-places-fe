import {
  CircularProgress,
  debounce,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, TextFieldElement, useForm } from "react-hook-form-mui";
import regExp from "@/shared/regExp";
import { useEffect, useMemo, useState } from "react";
import placesService from "@/services/places-service/places.service";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { StyledButton } from "@/components/UI/button/StyledButton";

interface IPlaceSlugSectionProps {
  place: IMyPlace;
  onReloadPlace: () => void;
}

const PlaceSlugSection = ({ place, onReloadPlace }: IPlaceSlugSectionProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<{ slug: string }>({
    mode: "onChange",
    defaultValues: {
      slug: place.slug,
    },
  });

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      placesService
        .updatePlaceSlug(place.id, data.slug)
        .then(() => {
          setLoading(false);
          form.reset({ slug: data.slug });
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: "Ссылка на места успешно обновлена",
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
          onReloadPlace();
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Ошибка!",
                description: "Ошибка при изменении ссылки на место.",
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  };

  const validateSlug = useMemo(
    () =>
      debounce((value: string) => {
        return placesService
          .validateSlug({ slug: value, id: place.id })
          .then((res) => {
            return true;
          })
          .catch((reason) => {
            const existsMessage = "SLUG_EXISTS";
            if (reason?.response?.data?.message === existsMessage)
              form.setError("slug", { message: "Данная ссылка уже занята" });
          });
      }, 300),
    [place.id]
  );

  return (
    <Paper
      sx={{
        p: "1em",
        borderRadius: "10px",
      }}
    >
      <FormProvider {...form}>
        <Typography
          fontWeight={600}
          fontSize={{ xs: "22px", md: "25px" }}
          gutterBottom
        >
          Общедоступная ссылка
        </Typography>
        <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
          Данная ссылка будет отображаться на поисковой странице сайта и видна
          другим пользователям
        </Typography>
        <TextFieldElement
          sx={{
            mt: "1em",
            "& input": { bgcolor: "white", borderRadius: "15px" },
            width: "100%",
            fontSize: { md: "20px" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"end"}>places/</InputAdornment>
            ),
          }}
          name={"slug"}
          onChange={(event) => validateSlug(event.target.value)}
          rules={{
            required: "Это поле обязательно к заполнению",
            pattern: {
              value: regExp.slugPattern,
              message: "Введено некорректное значение",
            },
          }}
          placeholder={"crevo-castle"}
        />
        <Stack
          mt={"0.3em"}
          mb={"1.5em"}
          color={"secondary.main"}
          fontSize={12}
          sx={{
            fontWeight: 300,
            opacity: 0.8,
          }}
          display={"flex"}
          direction={"row"}
          alignItems={"center"}
          gap={"0.5em"}
        >
          <InfoOutlinedIcon fontSize={"small"} />
          Ссылка должна состоять из символов латинского алфавита и знаков тире
        </Stack>
        <StyledButton
          size={"large"}
          startIcon={
            loading ? <CircularProgress color={"inherit"} size={22} /> : null
          }
          onClick={onSubmit}
          variant={"contained"}
          disabled={!form.formState.isDirty || !form.formState.isValid}
        >
          Обновить
        </StyledButton>
      </FormProvider>
    </Paper>
  );
};

export default PlaceSlugSection;
