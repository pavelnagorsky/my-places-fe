import { ChangeEvent } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import useUsers from "@/containers/admin/users/users-list/logic/useUsers";
import UsersTableHead from "@/containers/admin/users/users-list/table/UsersTableHead";
import { format } from "date-fns";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import useRolesOptions from "@/hooks/useRolesOptions";
import UsersHeader from "@/containers/admin/users/users-list/table/UsersHeader";
import { FormProvider } from "react-hook-form-mui";
import TableLoader from "@/components/UI/loader/TableLoader";

const PlaceTypesTable = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const locale = useDateFnsLocale();
  const roles = useRolesOptions();

  const {
    items,
    totalItems,
    formContext,
    rowsPerPage,
    currentPage,
    onChangePageSize,
    loading,
    onSubmit,
    changeCurrentPage,
  } = useUsers();

  function handleClick(item: IUserShortInfo) {
    router.push(`/administration/users/${item.id}`);
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangePageSize(event.target.value as any);
  };

  const noItems =
    items.length === 0 && loading === false ? (
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
          Пользователи не найдены
        </Typography>
      </Stack>
    ) : null;

  return (
    <Stack width={"100%"} minHeight={"100%"}>
      <FormProvider {...formContext}>
        <UsersHeader onSubmit={onSubmit} />
      </FormProvider>
      <Stack flexGrow={1} sx={{ overflowX: "auto" }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <UsersTableHead
            order={{
              id: 1,
              direction: "desc",
            }}
            onRequestSort={() => {}}
            rowCount={items.length}
          />
          <TableBody>
            {items.map((item, index) => {
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
                    {item.firstName} {item.lastName}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.email}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.roles
                      .map(
                        (r) =>
                          roles.find((opt) => opt.id === r.name)?.label ||
                          r.name
                      )
                      .join(", ")}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.isEmailConfirmed ? "Да" : "Нет"}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.blockedUntil
                      ? `До ${format(
                          new Date(item.blockedUntil),
                          "dd MMM yyyy",
                          { locale }
                        )}`
                      : "Нет"}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {format(new Date(item.createdAt), "dd MMM yyyy", {
                      locale,
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
      {noItems}
      {loading && items.length === 0 && <TableLoader />}
      <TablePagination
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={currentPage}
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
        onPageChange={(event, page) => changeCurrentPage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default PlaceTypesTable;
