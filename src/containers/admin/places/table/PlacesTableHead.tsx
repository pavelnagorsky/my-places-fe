import {
  lighten,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { MyPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { OrderDirectionsEnum } from "@/services/interfaces";

const rows = [
  {
    id: "id",
    align: "center",
    disablePadding: false,
    label: "ID",
    sort: false,
  },
  {
    id: MyPlacesOrderByEnum.TITLE,
    align: "left",
    disablePadding: false,
    label: "Название",
    sort: true,
  },
  {
    id: MyPlacesOrderByEnum.TYPE,
    align: "left",
    disablePadding: false,
    label: "Тип",
    sort: true,
  },
  {
    id: MyPlacesOrderByEnum.STATUS,
    align: "left",
    disablePadding: false,
    label: "Статус",
    sort: true,
  },
  {
    id: MyPlacesOrderByEnum.COMMERCIAL,
    align: "left",
    disablePadding: false,
    label: "Коммерция",
    sort: true,
  },
  {
    id: MyPlacesOrderByEnum.CREATED_AT,
    align: "left",
    disablePadding: false,
    label: "Дата создания",
    sort: true,
  },
  {
    id: "author",
    align: "left",
    disablePadding: false,
    label: "Автор",
    sort: false,
  },
];

interface IPlacesTableHeadProps {
  orderDirection: OrderDirectionsEnum;
  toggleOrderDirection: () => void;
  orderBy: MyPlacesOrderByEnum;
  changeOrderBy: (order: MyPlacesOrderByEnum) => void;
}

const PlacesTableHead = ({
  orderDirection,
  orderBy,
  toggleOrderDirection,
  changeOrderBy,
}: IPlacesTableHeadProps) => {
  const onClickSort = (order: MyPlacesOrderByEnum) => {
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
                    onClick={(e) => onClickSort(row.id as MyPlacesOrderByEnum)}
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

export default PlacesTableHead;
