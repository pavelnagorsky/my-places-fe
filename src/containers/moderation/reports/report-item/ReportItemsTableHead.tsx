import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";
import { ReportsOrderByEnum } from "@/services/reports-service/enums";

interface ITableHeadProps {
  show: boolean;
  orderBy: ReportsOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: ReportsOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const ReportItemsTableHead = ({
  show,
  orderDirection,
  orderBy,
  onChangeOrderBy,
  onChangeOrderDirection,
}: ITableHeadProps) => {
  const { t } = useTranslation("moderation");
  return (
    <Box
      mx={"0.5em"}
      mb={"-0.5em"}
      display={{ xs: "none", md: show ? "block" : "none" }}
    >
      <Grid
        container
        spacing={"1em"}
        fontSize={"14px"}
        textTransform={"uppercase"}
        alignItems={"center"}
        sx={{
          paddingInlineStart: "1em",
          "& p": { fontWeight: 700, fontSize: "12px", color: "secondary.main" },
        }}
      >
        <Grid size={{ xs: 3 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.Text}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(ReportsOrderByEnum.Text)}
          >
            <Typography>{t("reports.headings.report")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.EntityType}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ReportsOrderByEnum.EntityType)
            }
          >
            <Typography>{t("reports.headings.entityType")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.EntitySlug}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ReportsOrderByEnum.EntitySlug)
            }
          >
            <Typography>{t("reports.headings.slug")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.Status}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(ReportsOrderByEnum.Status)}
          >
            <Typography>{t("reports.headings.status")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.CreatedAt}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ReportsOrderByEnum.CreatedAt)
            }
          >
            <Typography>{t("reports.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportItemsTableHead;
