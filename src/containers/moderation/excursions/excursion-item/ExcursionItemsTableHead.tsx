import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";
import { MyRoutesOrderByEnum } from "@/services/routes-service/interfaces/interfaces";
import {
  ModerationExcursionsOrderByEnum,
  MyExcursionsOrderByEnum,
} from "@/services/excursions-service/interfaces/interfaces";

interface ITableHeadProps {
  show: boolean;
  orderBy: ModerationExcursionsOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: ModerationExcursionsOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const ExcursionItemsTableHead = ({
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
        pl={"1em"}
        container
        spacing={"1em"}
        fontSize={"14px"}
        textTransform={"uppercase"}
        alignItems={"center"}
        sx={{
          "& p": { fontWeight: 700, fontSize: "12px", color: "secondary.main" },
        }}
      >
        <Grid size={{ xs: 3 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationExcursionsOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationExcursionsOrderByEnum.TITLE)
            }
          >
            <Typography>{t("excursions.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography>{t("excursions.headings.places")}</Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationExcursionsOrderByEnum.DISTANCE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationExcursionsOrderByEnum.DISTANCE)
            }
          >
            <Typography>{t("excursions.headings.status")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationExcursionsOrderByEnum.DURATION}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationExcursionsOrderByEnum.DURATION)
            }
          >
            <Typography>{t("excursions.headings.type")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: "auto" }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationExcursionsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationExcursionsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("excursions.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExcursionItemsTableHead;
