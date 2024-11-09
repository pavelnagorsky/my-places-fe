import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { MyReviewsOrderByEnum } from "@/services/reviews-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation("personal-area");
  return (
    <Box
      mx={"0.5em"}
      mb={"-0.5em"}
      display={{ xs: "none", md: show ? "block" : "none" }}
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
        <Grid size={{ xs: 2.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyReviewsOrderByEnum.TITLE)}
          >
            <Typography>{t("reviews.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.PLACE_TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyReviewsOrderByEnum.PLACE_TITLE)
            }
          >
            <Typography>{t("reviews.headings.place")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2.2 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.STATUS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyReviewsOrderByEnum.STATUS)}
          >
            <Typography>{t("reviews.headings.status")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.8 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.VIEWS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyReviewsOrderByEnum.VIEWS)}
          >
            <Typography>{t("reviews.headings.views")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: "auto" }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyReviewsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyReviewsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("reviews.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewItemsTableHead;
