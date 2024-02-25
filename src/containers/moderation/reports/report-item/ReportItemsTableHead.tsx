import { Box, Grid, Typography } from "@mui/material";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { ReportsOrderByEnum } from "@/services/reports-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/services/interfaces";

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
        <Grid item xs={4}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.TEXT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(ReportsOrderByEnum.TEXT)}
          >
            <Typography>Жалоба</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={3}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.PLACE_SLUG}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ReportsOrderByEnum.PLACE_SLUG)
            }
          >
            <Typography>Место</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.STATUS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(ReportsOrderByEnum.STATUS)}
          >
            <Typography>Статус</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={"auto"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ReportsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ReportsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>Дата создания</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportItemsTableHead;
