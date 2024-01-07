import { Box, Grid, Typography } from "@mui/material";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { MyReviewsOrderByEnum } from "@/services/reviews-service/interfaces/interfaces";

interface ITableHeadProps {
  show: boolean;
  orderBy: MyReviewsOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: MyReviewsOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const ReviewItemsTableHead = ({
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
      display={{ xs: "none", lg: show ? "block" : "none" }}
    >
      <Grid
        container
        spacing={"1em"}
        pl={"1em"}
        fontSize={"14px"}
        textTransform={"uppercase"}
        alignItems={"center"}
        sx={{
          "& p": { fontWeight: 700, fontSize: "12px", color: "secondary.main" },
        }}
      >
        <Grid item xs={2.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyReviewsOrderByEnum.TITLE)}
          >
            <Typography>Название</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.PLACE_TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyReviewsOrderByEnum.PLACE_TITLE)
            }
          >
            <Typography>Место</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2.2}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.STATUS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyReviewsOrderByEnum.STATUS)}
          >
            <Typography>Статус</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={1.8}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.VIEWS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyReviewsOrderByEnum.VIEWS)}
          >
            <Typography>Просмотры</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={"auto"} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyReviewsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>Дата создания</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewItemsTableHead;
