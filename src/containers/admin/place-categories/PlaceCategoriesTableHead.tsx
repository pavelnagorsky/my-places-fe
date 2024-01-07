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
    id: "id",
    align: "center",
    disablePadding: false,
    label: "ID",
    sort: true,
  },
  {
    id: "title",
    align: "left",
    disablePadding: false,
    label: "Название",
    sort: true,
  },
  {
    id: "image1",
    align: "left",
    disablePadding: false,
    label: "Иконка",
    sort: false,
  },
  {
    id: "image2",
    align: "left",
    disablePadding: false,
    label: "Иконка цветная",
    sort: false,
  },
];

const PlaceCategoriesTableHead = (props: ITableHeadProps) => {
  const createSortHandler = (property: string) => (event: any) => {
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

export default PlaceCategoriesTableHead;
