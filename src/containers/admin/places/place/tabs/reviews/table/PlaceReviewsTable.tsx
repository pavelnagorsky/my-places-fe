import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";
import {
  Stack,
  Table,
  TableBody,
  TablePagination,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { FormProvider } from "react-hook-form-mui";
import usePlaceReviews from "@/containers/admin/places/place/tabs/reviews/usePlaceReviews";
import PlaceReviewsTableHead from "@/containers/admin/places/place/tabs/reviews/table/PlaceReviewsTableHead";
import PlaceReviewsTableItem from "@/containers/admin/places/place/tabs/reviews/table/PlaceReviewsTableItem";
import PlaceReviewsHeader from "@/containers/admin/places/place/tabs/reviews/PlaceReviewsHeader";

const PlaceReviewsTable = () => {
  const { i18n } = useTranslation();

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
    orderBy,
    orderDirection,
    toggleOrderDirection,
    changeOrderBy,
    handleDelete,
  } = usePlaceReviews();

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
          Заметки не найдены
        </Typography>
      </Stack>
    ) : null;

  return (
    <Stack width={"100%"} minHeight={"100%"}>
      <FormProvider {...formContext}>
        <PlaceReviewsHeader onSubmit={onSubmit} />
      </FormProvider>
      <Stack flexGrow={1} sx={{ overflowX: "auto" }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <PlaceReviewsTableHead
            orderDirection={orderDirection}
            orderBy={orderBy}
            changeOrderBy={changeOrderBy}
            toggleOrderDirection={toggleOrderDirection}
          />
          <TableBody>
            {items.map((item) => (
              <PlaceReviewsTableItem
                onDelete={handleDelete}
                item={item}
                key={item.id}
              />
            ))}
          </TableBody>
        </Table>
      </Stack>
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

export default PlaceReviewsTable;
