import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { StyledButton } from "@/components/UI/button/StyledButton";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import { FormProvider, useForm } from "react-hook-form-mui";
import { useState } from "react";
import { ISelect } from "@/shared/interfaces";
import { useAppDispatch } from "@/store/hooks";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import placesService from "@/services/places-service/places.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import ConfirmPopup from "@/components/confirm-popup/ConfirmPopup";
import usePopover from "@/hooks/usePopover";

interface IDeletePlaceForm {
  place: ISelect | null;
}

interface IDeletePlaceSectionProps {
  id: number;
  hasReviews: boolean;
}

const DeletePlaceSection = ({ id, hasReviews }: IDeletePlaceSectionProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const deleteConfirmPopover = usePopover("confirm-place-delete");

  const form = useForm<IDeletePlaceForm>({
    mode: "onChange",
    defaultValues: {
      place: null,
    },
  });

  const handleDelete = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      placesService
        .safelyDeletePlace(id, data.place?.id)
        .then(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: "Место успешно удалено",
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
          router.push(routerLinks.administrationPlaces);
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Ошибка!",
                description: "Ошибка при удалении места.",
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
          Удалить место
        </Typography>
        <FormProvider {...form}>
          {hasReviews && (
            <Box>
              <CustomLabel htmlFor={"place"}>
                Новое место для заметок
              </CustomLabel>
              <PlaceSelect excludeId={+id} fieldName={"place"} />
            </Box>
          )}
        </FormProvider>
        <Box mt={"0.5em"}>
          <StyledButton
            size={"large"}
            startIcon={
              loading ? <CircularProgress color={"inherit"} size={22} /> : null
            }
            onClick={deleteConfirmPopover.handleOpen}
            variant={"contained"}
            color={"error"}
          >
            Удалить
          </StyledButton>
          <ConfirmPopup
            popoverProps={deleteConfirmPopover}
            actionText={"Удалить"}
            title={"Вы уверены?"}
            onSubmit={handleDelete}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default DeletePlaceSection;
