import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MyPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

interface ITableHeadProps {
  show: boolean;
  orderBy: MyPlacesOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: MyPlacesOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const PlaceItemsTableHead = ({
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
        fontSize={"14px"}
        textTransform={"uppercase"}
        alignItems={"center"}
        sx={{
          "& p": { fontWeight: 700, fontSize: "12px", color: "secondary.main" },
        }}
      >
        <Grid size={{ xs: 1 }}></Grid>
        <Grid size={{ xs: 2.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyPlacesOrderByEnum.TITLE)}
          >
            <Typography>{t("places.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.6 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.TYPE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyPlacesOrderByEnum.TYPE)}
          >
            <Typography>{t("places.headings.type")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2.4 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.STATUS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyPlacesOrderByEnum.STATUS)}
          >
            <Typography>{t("places.headings.status")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.75 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.COMMERCIAL}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyPlacesOrderByEnum.COMMERCIAL)
            }
          >
            <Typography>{t("places.headings.commercial")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: "auto" }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyPlacesOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("places.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceItemsTableHead;
