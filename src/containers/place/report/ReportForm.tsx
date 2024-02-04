import {
  Box,
  Button,
  CircularProgress,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import {
  FormContainer,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useState } from "react";
import reportsService from "@/services/reports-service/reports.service";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";

interface IReportFormProps {
  open: boolean;
  onClose: () => void;
  anchorEl: Element | null;
  id?: string;
  placeId: number;
}

interface IReportFormContext {
  text: string;
}

const ReportForm = ({
  open,
  anchorEl,
  onClose,
  id,
  placeId,
}: IReportFormProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<IReportFormContext>({
    defaultValues: {
      text: "",
    },
  });

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const handleShowError = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Ошибка!",
          description:
            "Ошибка при отправлении жалобы. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlert({
        alertProps: {
          title: "Успех!",
          description: "Жалоба отправлена и будет рассмотрена модераторами",
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<IReportFormContext> = (data) => {
    if (loading) return;
    setLoading(true);
    reportsService
      .createReport({
        placeId,
        text: data.text,
      })
      .then(() => {
        setLoading(false);
        handleShowSuccess();
        handleClose();
      })
      .catch(() => {
        setLoading(false);
        handleShowError();
      });
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "15px",
          p: "1em",
        },
      }}
    >
      <FormContainer formContext={form} onSuccess={onSubmit}>
        <Box>
          <Typography fontWeight={600} fontSize={"20px"} mb={"0.5em"}>
            Отправить жалобу
          </Typography>
          <Typography variant={"body2"} mb={"0.5em"}>
            Опишите суть проблемы
          </Typography>
          <TextFieldElement
            placeholder={"Описание"}
            name={"text"}
            maxRows={4}
            multiline
            validation={{
              required: "Поле обязательно к заполнению",
              maxLength: {
                value: 500,
                message: "Максимальная длина 500 символов",
              },
            }}
          />
          <Stack
            mt={"1em"}
            direction={"row"}
            gap={"1em"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button variant={"text"} onClick={handleClose}>
              Отменить
            </Button>
            <Button variant={"contained"} type={"submit"}>
              {loading ? (
                <CircularProgress color={"inherit"} size={25} />
              ) : (
                "Отправить"
              )}
            </Button>
          </Stack>
        </Box>
      </FormContainer>
    </Popover>
  );
};

export default ReportForm;
