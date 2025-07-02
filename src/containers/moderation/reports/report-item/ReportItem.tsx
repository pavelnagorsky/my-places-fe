import { IReport } from "@/services/reports-service/interfaces/report.interface";
import {
  Box,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "next-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { format } from "date-fns";
import useCrmStatuses from "@/hooks/useCrmStatuses";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import ReportMenu from "@/containers/moderation/reports/report-item/menu/Menu";
import usePopover from "@/hooks/usePopover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import { routerLinks } from "@/routing/routerLinks";
import useStatisticEntityTypes from "@/containers/moderation/reports/logic/utils/useStatisticEntityTypes";

interface IReportItemProps {
  report: IReport;
}

const ReportItem = ({ report }: IReportItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation("moderation");
  const dateFnsLocale = useDateFnsLocale();
  const { parseStatusColor, statuses } = useCrmStatuses();
  const [status, setStatus] = useState(report.status);
  const menu = usePopover("report-menu");
  const entityTypes = useStatisticEntityTypes();

  const Menu = (
    <ReportMenu
      onChangeStatus={(newStatus) => setStatus(newStatus)}
      report={{ ...report, status }}
      popoverProps={menu}
    />
  );

  const entitySlugBox = (
    <Stack gap={"0.2em"}>
      {!!report.entitySlug && (
        <Typography
          component={Link}
          variant={"body1"}
          color={"secondary.main"}
          href={
            report.entityType === StatisticEntitiesEnum.Place
              ? routerLinks.place(report.entitySlug)
              : routerLinks.excursion(report.entitySlug)
          }
          target={"_blank"}
          sx={{
            textDecoration: "underline #565656",
            wordBreak: "break-word",
            width: "fit-content",
          }}
        >
          {report.entitySlug}
        </Typography>
      )}
    </Stack>
  );

  const textBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{report.text}</Typography>
    </Stack>
  );

  const entityTypeBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {entityTypes.find((type) => type?.id === report.entityType)?.label ||
          "-"}
      </Typography>
    </Stack>
  );

  const statusBox = (
    <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
      <Box
        borderRadius={"50%"}
        height={"10px"}
        width={"10px"}
        bgcolor={parseStatusColor(status)}
      />
      <Typography variant={"body1"}>
        {statuses.find((s) => s.id === status)?.label}
      </Typography>
    </Stack>
  );

  const createdAtInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(report.createdAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const mobileView = (
    <Box
      sx={{
        mb: "2em",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        p: "1.5em",
        borderRadius: "20px",
        "& label": {
          mb: "0.3em",
        },
      }}
    >
      <Stack direction={"row"}>
        <Grid container spacing={"1em"}>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("reports.headings.report")}</CustomLabel>
            {textBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("reports.headings.entityType")}</CustomLabel>
            {entityTypeBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("reports.headings.slug")}</CustomLabel>
            {entitySlugBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("reports.headings.status")}</CustomLabel>
            {statusBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("reports.headings.createdAt")}</CustomLabel>
            {createdAtInfoBox}
          </Grid>
        </Grid>
        <Stack ml={"0.5em"} justifyContent={"space-between"}>
          <IconButton
            onClick={menu.handleOpen}
            color={"secondary"}
            size={"small"}
          >
            <MoreVertIcon />
          </IconButton>
          {Menu}
        </Stack>
      </Stack>
    </Box>
  );

  const desktopView = (
    <Box
      py={"1em"}
      px={"0em"}
      sx={{
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        my: "1em",
        borderRadius: "20px",
        paddingInlineStart: "1em",
      }}
    >
      <Grid container spacing={"1em"} alignItems={"center"}>
        <Grid size={{ xs: 3 }}>{textBox}</Grid>
        <Grid size={{ xs: 1 }}>{entityTypeBox}</Grid>
        <Grid size={{ xs: 3 }}>{entitySlugBox}</Grid>
        <Grid size={{ xs: 2 }}>{statusBox}</Grid>
        <Grid size={{ xs: 2 }}>{createdAtInfoBox}</Grid>
        <Grid size={{ xs: 1 }}>
          <IconButton
            color={"secondary"}
            sx={{ mr: "0.5em" }}
            onClick={menu.handleOpen}
          >
            <MoreVertIcon />
          </IconButton>
          {Menu}
        </Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default ReportItem;
