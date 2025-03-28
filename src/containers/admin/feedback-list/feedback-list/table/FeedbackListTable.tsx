import { ChangeEvent } from "react";
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
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { FormProvider } from "react-hook-form-mui";
import useFeedbackList from "@/containers/admin/feedback-list/feedback-list/logic/useFeedbackList";
import useCrmStatuses from "@/hooks/useCrmStatuses";
import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";
import FeedbackListHeader from "@/containers/admin/feedback-list/feedback-list/table/FeedbackListHeader";
import FeedbackListTableHead from "@/containers/admin/feedback-list/feedback-list/table/FeedbackListTableHead";
import useUserTypes from "@/containers/contact-us/form/user-types/useUserTypes";
import TableLoader from "@/components/UI/helper/TableLoader";

const FeedbackListTable = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const locale = useDateFnsLocale();
  const { statuses, parseStatusColor } = useCrmStatuses();
  const userRequestTypes = useUserTypes();

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
  } = useFeedbackList();

  function handleClick(item: IFeedback) {
    router.push(`/administration/feedback-list/${item.id}`);
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangePageSize(event.target.value as any);
  };

  const noItems =
    items.length === 0 && !loading ? (
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
          Записи не найдены
        </Typography>
      </Stack>
    ) : null;

  return (
    <Stack width={"100%"}>
      <FormProvider {...formContext}>
        <FeedbackListHeader onSubmit={onSubmit} />
      </FormProvider>
      <Stack flexGrow={1} sx={{ overflowX: "auto" }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <FeedbackListTableHead
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
                    {item.fullName}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.email}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ maxWidth: "300px" }}
                  >
                    {item.message}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Stack
                      direction={"row"}
                      gap={"0.5em"}
                      alignItems={"center"}
                    >
                      <Box
                        borderRadius={"50%"}
                        height={"10px"}
                        width={"10px"}
                        bgcolor={parseStatusColor(item.status)}
                      />
                      <Typography>
                        {statuses.find((s) => s.id === item.status)?.label ||
                          "-"}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {userRequestTypes.find((t) => t.id === item.userRequestType)
                      ?.label || "-"}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {format(new Date(item.createdAt), "dd MMM yyyy", {
                      locale,
                    })}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {item.phone || "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
      {loading && items.length === 0 && <TableLoader />}
      {noItems}
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

export default FeedbackListTable;
