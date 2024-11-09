import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ModerationPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

interface ITableHeadProps {
  show: boolean;
  orderBy: ModerationPlacesOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: ModerationPlacesOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const PlaceItemsTableHead = ({
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
            isActive={orderBy === ModerationPlacesOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.TITLE)
            }
          >
            <Typography>{t("places.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.TYPE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.TYPE)
            }
          >
            <Typography>{t("places.headings.type")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.AUTHOR}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.AUTHOR)
            }
          >
            <Typography>{t("places.headings.author")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.COMMERCIAL}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.COMMERCIAL)
            }
          >
            <Typography>{t("places.headings.commercial")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("places.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.UPDATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.UPDATED_AT)
            }
          >
            <Typography>{t("places.headings.updatedAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceItemsTableHead;
