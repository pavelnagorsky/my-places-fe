import {
  ChangeEvent,
  useEffect,
  useState,
  MouseEvent,
  MouseEventHandler,
} from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { IOrderBy, ITableProps } from "@/containers/admin/interfaces";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import placeTypesService from "@/services/place-types-service/place-types.service";
import PlaceTypesTableHead from "@/containers/admin/place-types/PlaceTypesTableHead";

const PlaceTypesTable = ({ searchText }: ITableProps) => {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<IPlaceType[]>([]);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(items);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<IOrderBy>({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    // fetch items
    placeTypesService
      .getAll(i18n.language)
      .then(({ data }) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [i18n.language]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        items.filter(
          (item) =>
            item.id?.toString().includes(searchText.toLowerCase()) ||
            item.title.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(items);
    }
  }, [items, searchText]);

  function handleRequestSort(event: MouseEventHandler<any>, property: string) {
    const id = property;
    let direction: "asc" | "desc" = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }
    setPage(0);

    setOrder({
      direction,
      id,
    });
  }

  function handleClick(item: IPlaceType) {
    router.push(`/administration/place-types/${item.id}`);
  }

  function handleChangePage(
    event: MouseEvent<HTMLButtonElement> | null,
    value: number
  ) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLTextAreaElement>) {
    setRowsPerPage(event.target.value as any);
  }

  if (loading) {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.5em"}
        height={"5em"}
      >
        <CircularProgress size={30} />
        <Typography fontSize={"18px"} color={"secondary.main"} fontWeight={600}>
          Загрузка...
        </Typography>
      </Stack>
    );
  }

  if (data.length === 0) {
    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        flexGrow={1}
        height={"5em"}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
      >
        <Typography color="text.secondary" variant="h5">
          Типы не найдены
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack width={"100%"} minHeight={"100%"}>
      <Stack flexGrow={1} sx={{ overflowX: "auto" }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <PlaceTypesTableHead
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {data
              .sort((a, b) => {
                switch (order.id) {
                  case "id": {
                    return order.direction === "asc"
                      ? Number(a.id < b.id)
                      : Number(a.id > b.id);
                  }
                  case "title": {
                    return order.direction === "asc"
                      ? Number(a.title < b.title)
                      : Number(a.title > b.title);
                  }
                  case "commercial": {
                    return order.direction === "asc"
                      ? Number(a.commercial && !b.commercial)
                      : Number(!a.commercial && b.commercial);
                  }
                  default: {
                    return order.direction === "asc"
                      ? Number(a.id < b.id)
                      : Number(a.id > b.id);
                  }
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <TableRow
                    sx={{ cursor: "pointer" }}
                    hover
                    tabIndex={-1}
                    key={index}
                    onClick={() => handleClick(item)}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {item.id}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.commercial ? "Да" : "Нет"}
                    </TableCell>

                    <TableCell height={"3em"} component="th" scope="row">
                      {item.image ? (
                        <Box
                          maxHeight={"3em"}
                          borderRadius={"5px"}
                          width={"auto"}
                          component={"img"}
                          className="w-auto block rounded max-h-[2.5em]"
                          src={item.image}
                          alt={"Ошибка"}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item.image2 ? (
                        <Box
                          maxHeight={"3em"}
                          borderRadius={"5px"}
                          width={"auto"}
                          component={"img"}
                          src={item.image2}
                          alt={"Ошибка"}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Stack>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        labelDisplayedRows={(paginationInfo) => {
          return `${paginationInfo.from}-${paginationInfo.to} из ${paginationInfo.count}`;
        }}
        labelRowsPerPage={"Записей на страницу"}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default PlaceTypesTable;
