import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { StyledButton } from "@/components/UI/button/StyledButton";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import {
  FormContainer,
  FormProvider,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useState } from "react";
import { ISelect } from "@/shared/interfaces";
import { useAppDispatch } from "@/store/hooks";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";

interface IDeletePlaceForm {
  reason: string;
  place: ISelect | null;
}

interface IDeletePlaceSectionProps {
  id: number;
  hasReviews: boolean;
}

const DeletePlaceSection = ({ id, hasReviews }: IDeletePlaceSectionProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<IDeletePlaceForm>({
    mode: "onChange",
    defaultValues: {
      place: null,
      reason: "",
    },
  });

  const handleDelete = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
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
          <Box>
            <CustomLabel htmlFor={"reason"}>Причина</CustomLabel>
            <TextFieldElement
              id={"reason"}
              fullWidth
              name={"reason"}
              required
              placeholder={"Место является дубликатом"}
            />
          </Box>
          {hasReviews && (
            <Box>
              <CustomLabel htmlFor={"place"}>
                Новое место для заметок
              </CustomLabel>
              <PlaceSelect fieldName={"place"} />
            </Box>
          )}
        </FormProvider>
        <Box mt={"0.5em"}>
          <StyledButton
            size={"large"}
            startIcon={
              loading ? <CircularProgress color={"inherit"} size={22} /> : null
            }
            onClick={handleDelete}
            variant={"contained"}
            color={"error"}
          >
            Удалить
          </StyledButton>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DeletePlaceSection;
