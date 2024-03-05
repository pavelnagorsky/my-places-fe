import {
  lighten,
  SortDirection,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { ITableHeadProps } from "@/containers/admin/interfaces";
import { primaryBackground } from "@/styles/theme/lightTheme";

const rows = [
  {
    id: 0,
    align: "center",
    disablePadding: false,
    label: "ID",
    sort: false,
  },
  {
    id: 1,
    align: "left",
    disablePadding: false,
    label: "Полное имя",
    sort: false,
  },
  {
    id: 2,
    align: "left",
    disablePadding: false,
    label: "Почта",
    sort: false,
  },
  {
    id: 3,
    align: "left",
    disablePadding: false,
    label: "Сообщение",
    sort: false,
  },
  {
    id: 4,
    align: "left",
    disablePadding: false,
    label: "Статус",
    sort: false,
  },
  {
    id: 5,
    align: "left",
    disablePadding: false,
    label: "Тип",
    sort: false,
  },
  {
    id: 6,
    align: "left",
    disablePadding: false,
    label: "Дата создания",
    sort: false,
  },
  {
    id: 7,
    align: "left",
    disablePadding: false,
    label: "Телефон",
    sort: false,
  },
];

const FeedbackTableHead = (props: ITableHeadProps) => {
  const createSortHandler = (property: any) => (event: any) => {
    props.onRequestSort(event, property);
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
                props.order.id === row.id
                  ? (props.order.direction as SortDirection)
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
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
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
        }, this)}
      </TableRow>
    </TableHead>
  );
};

export default FeedbackTableHead;
