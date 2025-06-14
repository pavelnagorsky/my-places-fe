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
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

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
  const { t } = useTranslation(["place", "common"]);
  const sendAnalytics = useAnalytics();
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
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", { ns: "common" }),
          description: `${t("report.feedback.error")} ${t(
            "errors.description",
            { ns: "common" }
          )}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.success", { ns: "common" }),
          description: t("report.feedback.success"),
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
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "place report form submit",
      placeId: placeId,
    });
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
            {t("report.subtitle")}
          </Typography>
          <Typography variant={"body2"} mb={"0.5em"}>
            {t("report.description")}
          </Typography>
          <TextFieldElement
            placeholder={"Описание"}
            name={"text"}
            maxRows={4}
            multiline
            rules={{
              required: t("errors.required", { ns: "common" }),
              maxLength: {
                value: 500,
                message: t("errors.maxLength", { ns: "common", value: 500 }),
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
              {t("buttons.cancel", { ns: "common" })}
            </Button>
            <Button variant={"contained"} type={"submit"}>
              {loading ? (
                <CircularProgress color={"inherit"} size={25} />
              ) : (
                t("buttons.send", { ns: "common" })
              )}
            </Button>
          </Stack>
        </Box>
      </FormContainer>
    </Popover>
  );
};

export default ReportForm;
