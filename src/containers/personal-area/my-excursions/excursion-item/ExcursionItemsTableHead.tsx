import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";
import { MyRoutesOrderByEnum } from "@/services/routes-service/interfaces/interfaces";

interface ITableHeadProps {
  show: boolean;
  orderBy: MyRoutesOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: MyRoutesOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const ExcursionItemsTableHead = ({
  show,
  orderDirection,
  orderBy,
  onChangeOrderBy,
  onChangeOrderDirection,
}: ITableHeadProps) => {
  const { t } = useTranslation("personal-area");
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
            isActive={orderBy === MyRoutesOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyRoutesOrderByEnum.TITLE)}
          >
            <Typography>{t("routes.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography>{t("routes.headings.places")}</Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyRoutesOrderByEnum.DISTANCE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyRoutesOrderByEnum.DISTANCE)
            }
          >
            <Typography>{t("routes.headings.distance")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyRoutesOrderByEnum.DURATION}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyRoutesOrderByEnum.DURATION)
            }
          >
            <Typography>{t("routes.headings.duration")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: "auto" }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyRoutesOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyRoutesOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("routes.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExcursionItemsTableHead;
