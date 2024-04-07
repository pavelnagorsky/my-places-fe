import { OrderDirectionsEnum } from "@/services/interfaces";
import { MyReviewsOrderByEnum } from "@/services/reviews-service/interfaces/interfaces";
import { MyPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import {
  lighten,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";

const rows = [
  {
    id: "id",
    align: "center",
    disablePadding: false,
    label: "ID",
    sort: false,
  },
  {
    id: MyReviewsOrderByEnum.TITLE,
    align: "left",
    disablePadding: false,
    label: "Название",
    sort: true,
  },
  {
    id: MyReviewsOrderByEnum.STATUS,
    align: "left",
    disablePadding: false,
    label: "Статус",
    sort: true,
  },
  {
    id: MyReviewsOrderByEnum.VIEWS,
    align: "left",
    disablePadding: false,
    label: "Просмотры",
    sort: true,
  },
  {
    id: MyReviewsOrderByEnum.CREATED_AT,
    align: "left",
    disablePadding: false,
    label: "Дата создания",
    sort: true,
  },
  {
    id: "menu",
    align: "left",
    disablePadding: false,
    sort: false,
  },
];

interface IReviewsTableHeadProps {
  orderDirection: OrderDirectionsEnum;
  toggleOrderDirection: () => void;
  orderBy: MyReviewsOrderByEnum;
  changeOrderBy: (order: MyReviewsOrderByEnum) => void;
}

const PlaceReviewsTableHead = ({
  orderDirection,
  orderBy,
  toggleOrderDirection,
  changeOrderBy,
}: IReviewsTableHeadProps) => {
  const onClickSort = (order: MyReviewsOrderByEnum) => {
    if (order === orderBy) {
      toggleOrderDirection();
    } else {
      changeOrderBy(order);
    }
  };

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) => lighten(primaryBackground, 0.7),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align as any}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                orderBy === row.id
                  ? orderDirection === OrderDirectionsEnum.ASC
                    ? "asc"
                    : "desc"
                  : false
              }
            >
              {row.sort ? (
                <Tooltip
                  title="Сортировка"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={
                      orderDirection === OrderDirectionsEnum.ASC
                        ? "asc"
                        : "desc"
                    }
                    onClick={(e) => onClickSort(row.id as MyReviewsOrderByEnum)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                <p className="font-semibold">{row.label}</p>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default PlaceReviewsTableHead;
