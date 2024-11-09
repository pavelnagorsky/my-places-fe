import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { ModerationReviewsOrderByEnum } from "@/services/reviews-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

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
        <Grid size={{ xs: 2.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.TITLE)
            }
          >
            <Typography>{t("reviews.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.PLACE_TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.PLACE_TITLE)
            }
          >
            <Typography>{t("reviews.headings.place")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.AUTHOR}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.AUTHOR)
            }
          >
            <Typography>{t("reviews.headings.author")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("reviews.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationReviewsOrderByEnum.UPDATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationReviewsOrderByEnum.UPDATED_AT)
            }
          >
            <Typography>{t("reviews.headings.updatedAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewItemsTableHead;
