import { Box, Grid, Typography } from "@mui/material";
import { MyPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import SortingButton from "@/components/UI/sorting-button/SortingButton";

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
  return (
    <Box
      mx={"0.5em"}
      mb={"-0.5em"}
      display={{ xs: "none", lg: show ? "block" : "none" }}
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
        <Grid item xs={1}></Grid>
        <Grid item xs={2.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyPlacesOrderByEnum.TITLE)}
          >
            <Typography>Название</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={1.6}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.TYPE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyPlacesOrderByEnum.TYPE)}
          >
            <Typography>Тип</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2.4}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.STATUS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() => onChangeOrderBy(MyPlacesOrderByEnum.STATUS)}
          >
            <Typography>Статус</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={1.75}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.COMMERCIAL}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyPlacesOrderByEnum.COMMERCIAL)
            }
          >
            <Typography>Коммерция</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={"auto"} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyPlacesOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyPlacesOrderByEnum.CREATED_AT)
            }
          >
            <Typography>Дата создания</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceItemsTableHead;
