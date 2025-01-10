import { useAppDispatch } from "@/store/hooks";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form-mui";
import { IEmail } from "@/services/user-service/interfaces/email.interface";
import userService from "@/services/user-service/user.service";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import {
  CircularProgress,
  IconButton,
  Paper,
  Popover,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import MailingForm from "@/components/mailing-form/MailingForm";
import { StyledButton } from "@/components/UI/button/StyledButton";
import usePopover from "@/hooks/usePopover";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import CloseIcon from "@mui/icons-material/Close";

const EmailSection = ({ user, sx }: { user: IUserShortInfo; sx?: SxProps }) => {
  const dispatch = useAppDispatch();
  const popover = usePopover("email");
  const [loading, setLoading] = useState(false);
  const form = useForm<IEmail>({
    mode: "onChange",
    defaultValues: {
      to: user.email || "",
      subject: "Обратная связь",
      text: `<p>Уважаемый ${user.firstName} ${user.lastName},<p/>`,
    },
  });

  const onReset = () => form.reset();

  const onSubmit = () => {
    form.handleSubmit((data) => {
      if (loading) return;
      setLoading(true);
      userService
        .sendEmail(data)
        .then(() => {
          setLoading(false);
          popover.handleClose();
          form.reset();
          dispatch(
            showAlertThunk({
              alertProps: {
                title: "Успех!",
                description: `Письмо было успешно отправлено ${data.to}.`,
                variant: "standard",
                severity: "success",
              },
              snackbarProps: {},
            })
          );
        })
        .catch(() => {
          setLoading(false);
        });
    })();
  };

  return (
    <Fragment>
      <StyledButton
        variant={"contained"}
        size={"large"}
        sx={sx}
        onClick={popover.handleOpen}
      >
        Отправить email
      </StyledButton>
      <Popover
        open={popover.open}
        onClose={popover.handleClose}
        id={popover.id}
        anchorEl={popover.anchor}
        PaperProps={{
          sx: {
            p: "1.5em",
            borderRadius: "20px",
          },
        }}
      >
        <Stack
          direction={"row"}
          gap={"0.5em"}
          mb={"0.35em"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={600} fontSize={{ xs: "22px", md: "25px" }}>
            Отправить сообщение
          </Typography>
          <IconButton onClick={popover.handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <FormProvider {...form}>
          <Stack mt={"1em"} gap={"1em"}>
            <MailingForm />
            <Stack
              direction={"row"}
              mt={"0.5em"}
              justifyContent={"space-between"}
              gap={"1em"}
            >
              <StyledButton size={"large"} onClick={onReset}>
                Очистить
              </StyledButton>
              <StyledButton
                size={"large"}
                variant={"contained"}
                onClick={onSubmit}
                startIcon={
                  loading ? (
                    <CircularProgress color={"inherit"} size={22} />
                  ) : null
                }
              >
                Отправить
              </StyledButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Popover>
    </Fragment>
  );
};

export default EmailSection;
