import { Box, Stack, Typography } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { motion } from "framer-motion";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ChatIcon from "@mui/icons-material/Chat";
import { routerLinks } from "@/routing/routerLinks";
import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";
import { FormProvider, SelectElement, useForm } from "react-hook-form-mui";
import useCrmStatuses from "@/hooks/useCrmStatuses";
import { CrmStatusesEnum } from "@/services/interfaces";
import { useEffect } from "react";
import contactService from "@/services/contact-service/contact.service";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";

interface IUserHeaderProps {
  feedback: IFeedback | null;
}

const FeedbackHeader = ({ feedback }: IUserHeaderProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query as { id: string };
  const { colorizedStatuses } = useCrmStatuses();
  const form = useForm<{ status: CrmStatusesEnum }>({
    defaultValues: {
      status: "" as any,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!feedback) return;
    form.reset({
      status: feedback.status,
    });
  }, [feedback]);

  const handleChangeStatus = (status: CrmStatusesEnum) => {
    contactService
      .updateStatus(query.id, status)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Успех!",
              description: "Статус успешно изменен",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {
              autoHideDuration: 3000,
            },
          })
        );
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: "Ошибка!",
              description: "Ошибка при изменении статуса.",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  return (
    <Stack
      gap={"1em"}
      direction={{ sm: "row" }}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={primaryBackground}
      px={{ xs: "1em", lg: "2em" }}
      py={"1em"}
    >
      <Stack alignItems={{ xs: "center", sm: "start" }} width={"100%"}>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            fontWeight={500}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "0.5em",
              textDecoration: "none",
            }}
            component={Link}
            role="button"
            href={routerLinks.administrationFeedbackList}
            color="inherit"
          >
            <KeyboardBackspaceIcon />
            <Box component={"span"} mx={"0.2em"}>
              Обратная связь
            </Box>
          </Typography>
        </motion.div>

        <Stack
          direction={"row"}
          alignItems={"center"}
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.3 } }}
        >
          <Box display={{ xs: "none", sm: "block" }}>
            <ChatIcon fontSize={"large"} />
          </Box>
          <Stack
            component={motion.div}
            alignItems={{ xs: "center", sm: "start" }}
            mx={{ xs: "0.5em", sm: "1em" }}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              fontSize={{ xs: "20px", md: "25px" }}
              fontWeight={600}
            >
              {feedback?.fullName || ""}
            </Typography>
            <Typography variant="caption" fontSize={"12px"} fontWeight={500}>
              Информация о пользователе
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        gap={"1em"}
        direction={{ md: "row" }}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Box
          component={motion.div}
          sx={{ display: "flex", gap: "1em" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <FormProvider {...form}>
            <SelectElement
              sx={{
                backgroundColor: "white",
              }}
              name={"status"}
              options={colorizedStatuses}
              required
              onChange={handleChangeStatus}
            />
          </FormProvider>
        </Box>
      </Stack>
    </Stack>
  );
};

export default FeedbackHeader;
