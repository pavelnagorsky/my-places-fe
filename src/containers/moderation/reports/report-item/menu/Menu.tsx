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
import usePlaceRejection from "@/containers/moderation/reports/report-item/menu/usePlaceRejection";
import useReportRejection from "@/containers/moderation/reports/report-item/menu/useReportRejection";
import { CrmStatusesEnum } from "@/services/interfaces";

interface IReportMenuProps {
  anchorEl: null | Element;
  open: boolean;
  handleClose: () => void;
  id: number;
  placeSlug: string;
  placeId: number;
  status: CrmStatusesEnum;
  onChangeStatus: (status: CrmStatusesEnum) => void;
}

const ReportMenu = ({
  anchorEl,
  handleClose,
  open,
  id,
  status,
  placeId,
  placeSlug,
  onChangeStatus,
}: IReportMenuProps) => {
  const { t } = useTranslation(["moderation", "common"]);
  const popover = usePopover("menu-action");
  const [action, setAction] = useState<
    "decline-place" | "decline-report" | null
  >(null);

  const showActions = status === CrmStatusesEnum.PENDING;

  const onClosePopover = () => {
    popover.handleClose();
    setAction(null);
  };

  const onCloseAll = () => {
    onClosePopover();
    handleClose();
  };

  const placeDecline = usePlaceRejection({
    placeId: placeId,
    reportId: id,
    onSuccess: () => {
      onCloseAll();
      onChangeStatus(CrmStatusesEnum.DONE);
    },
  });
  const reportDecline = useReportRejection({
    id,
    onSuccess: () => {
      onCloseAll();
      onChangeStatus(CrmStatusesEnum.DECLINED);
    },
  });

  const onClickDeclinePlace = (e: MouseEvent) => {
    setAction("decline-place");
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

  const declinePlaceContent = (
    <Stack gap={"1em"}>
      <Typography fontWeight={500} fontSize={"22px"}>
        {t("reports.menu.placeRejection")}
      </Typography>
      <FormProvider {...placeDecline.form}>
        <TextFieldElement
          fullWidth
          name={"feedback"}
          id={"feedback"}
          placeholder={t("reports.menu.reason")}
          required
          multiline
          minRows={1}
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
              placeDecline.loading ? (
                <CircularProgress size={20} color={"inherit"} />
              ) : null
            }
            onClick={placeDecline.onSubmit}
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
          {action === "decline-place"
            ? declinePlaceContent
            : declineReportContent}
        </Popover>
      )}
      <Menu
        id="report-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "report-menu",
        }}
      >
        <MenuItem
          onClick={handleClose}
          component={"a"}
          href={routerLinks.place(placeSlug)}
          target={"_blank"}
        >
          {t("reports.menu.viewPlace")}
        </MenuItem>
        {showActions && (
          <MenuItem onClick={onClickDeclinePlace}>
            {t("reports.menu.rejectPlace")}
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
