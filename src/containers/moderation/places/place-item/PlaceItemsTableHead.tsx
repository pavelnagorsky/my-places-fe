import { Box, Grid, Typography } from "@mui/material";
import { ModerationPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import SortingButton from "@/components/UI/sorting-button/SortingButton";

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
            isActive={orderBy === ModerationPlacesOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.TITLE)
            }
          >
            <Typography>Название</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={1.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.TYPE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.TYPE)
            }
          >
            <Typography>Тип</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.AUTHOR}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.AUTHOR)
            }
          >
            <Typography>Автор</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={1.5}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.COMMERCIAL}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.COMMERCIAL)
            }
          >
            <Typography>Коммерция</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.CREATED_AT)
            }
          >
            <Typography>Дата создания</Typography>
          </SortingButton>
        </Grid>
        <Grid item xs={2} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === ModerationPlacesOrderByEnum.UPDATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(ModerationPlacesOrderByEnum.UPDATED_AT)
            }
          >
            <Typography>Дата обновления</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceItemsTableHead;
