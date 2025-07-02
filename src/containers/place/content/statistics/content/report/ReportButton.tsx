import { Box, IconButton, Tooltip } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import ReportForm from "@/containers/place/content/statistics/content/report/content/ReportForm";
import usePopover from "@/hooks/usePopover";
import { useTranslation } from "next-i18next";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";

const ReportButton = ({
  entityId,
  entityType,
}: {
  entityType: StatisticEntitiesEnum;
  entityId: number;
}) => {
  const reportPopover = usePopover("report-form");
  const { t } = useTranslation("common");

  return (
    <Box>
      <Tooltip
        arrow
        enterTouchDelay={0}
        sx={{ fontSize: "16px", alignSelf: "center" }}
        title={t("report.title")}
      >
        <IconButton
          aria-label="report-form"
          size={"small"}
          onClick={reportPopover.handleOpen}
        >
          <FlagIcon />
        </IconButton>
      </Tooltip>
      <ReportForm
        popoverProps={reportPopover}
        entityId={entityId}
        entityType={entityType}
      />
    </Box>
  );
};

export default ReportButton;
