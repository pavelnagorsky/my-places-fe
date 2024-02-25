import { Box, Grid, Typography } from "@mui/material";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { ModerationReviewsOrderByEnum } from "@/services/reviews-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/services/interfaces";

interface ITableHeadProps {
  show: boolean;
  orderBy: ModerationReviewsOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: ModerationReviewsOrderByEnum) => void;
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
        <Grid item xs={2.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.TITLE)
            }
          >
            <Typography>Название</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={3}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.PLACE_TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.PLACE_TITLE)
            }
          >
            <Typography>Место</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.AUTHOR}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.AUTHOR)
            }
          >
            <Typography>Автор</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>Дата создания</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.UPDATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.UPDATED_AT)
            }
          >
            <Typography>Дата обновления</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewItemsTableHead;
