import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { StyledButton } from "@/components/UI/button/StyledButton";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import excursionsService from "@/services/excursions-service/excursions.service";

interface IDeleteExcursionSectionProps {
  id: number;
}

const DeleteExcursionSection = ({ id }: IDeleteExcursionSectionProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (loading) return;
    setLoading(true);
    excursionsService
      .delete(id)
      .then(() => {
        setLoading(false);
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Успех!",
              description: "Экскурсия успешно удалена",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        router.push(routerLinks.administrationExcursions);
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Ошибка!",
              description: "Ошибка при удалении экскурсии.",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
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

export default DeleteExcursionSection;
