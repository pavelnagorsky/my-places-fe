import {
  lighten,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { OrderDirectionsEnum } from "@/services/interfaces";

import { MyExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";

const rows = [
  {
    id: "id",
    align: "center",
    disablePadding: false,
    label: "ID",
    sort: false,
  },
  {
    id: MyExcursionsOrderByEnum.TITLE,
    align: "left",
    disablePadding: false,
    label: "Название",
    sort: true,
  },
  {
    id: "places",
    align: "left",
    disablePadding: false,
    label: "Места",
    sort: false,
  },
  {
    id: MyExcursionsOrderByEnum.STATUS,
    align: "left",
    disablePadding: false,
    label: "Статус",
    sort: true,
  },
  {
    id: MyExcursionsOrderByEnum.TYPE,
    align: "left",
    disablePadding: false,
    label: "Тип",
    sort: true,
  },
  {
    id: "author",
    align: "left",
    disablePadding: false,
    label: "Автор",
    sort: false,
  },
  {
    id: MyExcursionsOrderByEnum.CREATED_AT,
    align: "left",
    disablePadding: false,
    label: "Дата создания",
    sort: true,
  },
  {
    id: MyExcursionsOrderByEnum.UPDATED_AT,
    align: "left",
    disablePadding: false,
    label: "Дата обновления",
    sort: true,
  },
];

interface IPlacesTableHeadProps {
  orderDirection: OrderDirectionsEnum;
  toggleOrderDirection: () => void;
  orderBy: MyExcursionsOrderByEnum;
  changeOrderBy: (order: MyExcursionsOrderByEnum) => void;
}

const ExcursionsTableHead = ({
  orderDirection,
  orderBy,
  toggleOrderDirection,
  changeOrderBy,
}: IPlacesTableHeadProps) => {
  const onClickSort = (order: MyExcursionsOrderByEnum) => {
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
                    onClick={(e) =>
                      onClickSort(row.id as MyExcursionsOrderByEnum)
                    }
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

export default ExcursionsTableHead;
