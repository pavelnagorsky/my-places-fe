import { useTranslation } from "next-i18next";
import usePopover from "@/hooks/usePopover";
import { Fragment, MouseEvent, useState } from "react";
import {
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { routerLinks } from "@/routing/routerLinks";
import { FormProvider, TextFieldElement } from "react-hook-form-mui";
import { StyledButton } from "@/components/UI/button/StyledButton";
import usePlaceRejection from "@/containers/moderation/reports/report-item/menu/logic/usePlaceRejection";
import useReportRejection from "@/containers/moderation/reports/report-item/menu/logic/useReportRejection";
import { CrmStatusesEnum } from "@/services/interfaces";
import { IPopoverProps } from "@/components/confirm-popup/ConfirmPopup";
import { IReport } from "@/services/reports-service/interfaces/report.interface";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import useExcursionRejection from "@/containers/moderation/reports/report-item/menu/logic/useExcursionRejection";

interface IReportMenuProps {
  popoverProps: IPopoverProps;
  report: IReport;
  onChangeStatus: (status: CrmStatusesEnum) => void;
}

const ReportMenu = ({
  popoverProps,
  report,
  onChangeStatus,
}: IReportMenuProps) => {
  const { t } = useTranslation(["moderation", "common"]);
  const popover = usePopover("menu-action");
  const [action, setAction] = useState<
    "decline-place" | "decline-excursion" | "decline-report" | null
  >(null);

  const showActions = report.status === CrmStatusesEnum.PENDING;

  const onClosePopover = () => {
    popover.handleClose();
    setAction(null);
  };

  const onCloseAll = () => {
    onClosePopover();
    popoverProps.handleClose();
  };

  const placeDecline = usePlaceRejection({
    placeId: report.entityId,
    reportId: report.id,
    onSuccess: () => {
      onCloseAll();
      onChangeStatus(CrmStatusesEnum.DONE);
    },
  });
  const excursionDecline = useExcursionRejection({
    excursionId: report.entityId,
    reportId: report.id,
    onSuccess: () => {
      onCloseAll();
      onChangeStatus(CrmStatusesEnum.DONE);
    },
  });
  const reportDecline = useReportRejection({
    id: report.id,
    onSuccess: () => {
      onCloseAll();
      onChangeStatus(CrmStatusesEnum.DECLINED);
    },
  });

  const onClickDeclinePlace = (e: MouseEvent) => {
    setAction("decline-place");
    popover.handleOpen(e);
  };

  const onClickDeclineExcursion = (e: MouseEvent) => {
    setAction("decline-excursion");
    popover.handleOpen(e);
  };

  const onClickDeclineReport = (e: MouseEvent) => {
    setAction("decline-report");
    popover.handleOpen(e);
  };

  const declineReportContent = (
    <Stack gap={"1em"}>
      <Typography fontWeight={500} fontSize={"22px"}>
        {t("reports.menu.reportRejection")}
      </Typography>
      <Divider sx={{ borderColor: "divider" }} />
      <Stack gap={"1em"} direction={"row"}>
        <StyledButton
          onClick={onClosePopover}
          variant={"outlined"}
          sx={{ fontSize: "16px" }}
          size="large"
        >
          {t("buttons.cancellation", { ns: "common" })}
        </StyledButton>
        <StyledButton
          startIcon={
            reportDecline.loading ? (
              <CircularProgress size={20} color={"inherit"} />
            ) : null
          }
          onClick={reportDecline.onSubmit}
          variant={"contained"}
          size="large"
          sx={{ fontSize: "16px" }}
        >
          {t("buttons.reject", { ns: "common" })}
        </StyledButton>
      </Stack>
    </Stack>
  );

  const declineEntityContent = (
    <Stack gap={"1em"} minWidth={"300px"}>
      <Typography fontWeight={500} fontSize={"22px"}>
        {action === "decline-place"
          ? t("reports.menu.placeRejection")
          : t("reports.menu.excursionRejection")}
      </Typography>
      <FormProvider
        {...(action === "decline-place"
          ? placeDecline.form
          : excursionDecline.form)}
      >
        <TextFieldElement
          fullWidth
          name={"feedback"}
          id={"feedback"}
          placeholder={t("reports.menu.reason")}
          required
          multiline
          minRows={2}
          parseError={() => t("errors.required", { ns: "common" })}
        />
        <Stack gap={"1em"} mt={"1em"} direction={"row"}>
          <StyledButton
            onClick={onClosePopover}
            variant={"outlined"}
            sx={{ fontSize: "16px" }}
            size="large"
          >
            {t("buttons.cancellation", { ns: "common" })}
          </StyledButton>
          <StyledButton
            startIcon={
              (action === "decline-place" ? placeDecline : excursionDecline)
                .loading ? (
                <CircularProgress size={20} color={"inherit"} />
              ) : null
            }
            onClick={
              action === "decline-place"
                ? placeDecline.onSubmit
                : excursionDecline.onSubmit
            }
            variant={"contained"}
            size="large"
            sx={{ fontSize: "16px" }}
          >
            {t("buttons.reject", { ns: "common" })}
          </StyledButton>
        </Stack>
      </FormProvider>
    </Stack>
  );

  return (
    <Fragment>
      {showActions && (
        <Popover
          open={popover.open}
          id={popover.id}
          anchorEl={popover.anchor}
          onClose={onClosePopover}
          PaperProps={{
            sx: {
              p: "1em",
              borderRadius: "15px",
            },
          }}
        >
          {action === "decline-report"
            ? declineReportContent
            : declineEntityContent}
        </Popover>
      )}
      <Menu
        id={popoverProps.id}
        anchorEl={popoverProps.anchor}
        open={popoverProps.open}
        onClose={popoverProps.handleClose}
        MenuListProps={{
          "aria-labelledby": "report-menu",
        }}
      >
        {!!report.entitySlug && (
          <MenuItem
            onClick={popoverProps.handleClose}
            component={"a"}
            href={
              report.entityType === StatisticEntitiesEnum.Place
                ? routerLinks.place(report.entitySlug)
                : routerLinks.excursion(report.entitySlug)
            }
            target={"_blank"}
          >
            {t("reports.menu.view")}
          </MenuItem>
        )}
        {showActions && report.entityType === StatisticEntitiesEnum.Place && (
          <MenuItem onClick={onClickDeclinePlace}>
            {t("reports.menu.rejectPlace")}
          </MenuItem>
        )}
        {showActions &&
          report.entityType === StatisticEntitiesEnum.Excursion && (
            <MenuItem onClick={onClickDeclineExcursion}>
              {t("reports.menu.rejectExcursion")}
            </MenuItem>
          )}
        {showActions && (
          <MenuItem onClick={onClickDeclineReport}>
            {t("reports.menu.rejectReport")}
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default ReportMenu;
