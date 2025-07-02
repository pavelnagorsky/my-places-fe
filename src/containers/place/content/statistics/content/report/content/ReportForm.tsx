import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  FormLabel,
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
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import { IPopoverProps } from "@/components/confirm-popup/ConfirmPopup";

interface IReportFormProps {
  popoverProps: IPopoverProps;
  entityType: StatisticEntitiesEnum;
  entityId: number;
}

interface IReportFormContext {
  text: string;
}

const ReportForm = ({
  popoverProps,
  entityId,
  entityType,
}: IReportFormProps) => {
  const { t } = useTranslation("common");
  const sendAnalytics = useAnalytics();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const form = useForm<IReportFormContext>({
    defaultValues: {
      text: "",
    },
  });

  const handleClose = () => {
    popoverProps.handleClose();
    form.reset();
  };

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error"),
          description: `${t("report.feedback.error")} ${t(
            "errors.description"
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
          title: t("feedback.success"),
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
      title: `report form submit, entity type = ${entityType}`,
      entityId: `${entityId}`,
    });
    reportsService
      .createReport({
        entityId,
        entityType,
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
      id={popoverProps.id}
      open={popoverProps.open}
      anchorEl={popoverProps.anchor}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "15px",
          p: "1em",
        },
      }}
    >
      <FormContainer formContext={form} onSuccess={onSubmit}>
        <Box minWidth={"300px"}>
          <Typography fontWeight={600} fontSize={"20px"} mb={"0.5em"}>
            {t("report.subtitle")}
          </Typography>
          <FormGroup>
            <FormLabel htmlFor={"description"} sx={{ pb: 1 }}>
              {t("report.description")}
            </FormLabel>
            <TextFieldElement
              id={"description"}
              placeholder={t("report.description")}
              name={"text"}
              fullWidth
              rows={4}
              multiline
              rules={{
                required: t("errors.required"),
                maxLength: {
                  value: 500,
                  message: t("errors.maxLength", { value: 500 }),
                },
              }}
            />
          </FormGroup>
          <Stack
            mt={"1em"}
            direction={"row"}
            gap={"1em"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button variant={"text"} onClick={handleClose}>
              {t("buttons.cancel")}
            </Button>
            <Button variant={"contained"} type={"submit"}>
              {loading ? (
                <CircularProgress color={"inherit"} size={25} />
              ) : (
                t("buttons.send")
              )}
            </Button>
          </Stack>
        </Box>
      </FormContainer>
    </Popover>
  );
};

export default ReportForm;
