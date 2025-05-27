import { ChangeEvent } from "react";
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { format } from "date-fns";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { FormProvider } from "react-hook-form-mui";
import { routerLinks } from "@/routing/routerLinks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableLoader from "@/components/UI/loader/TableLoader";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";
import useExcursionStatuses from "@/containers/personal-area/my-excursions/logic/utils/useExcursionStatuses";
import useExcursions from "@/containers/admin/excursions/excursions-list/logic/useExcursions";
import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";
import ExcursionsHeader from "@/containers/admin/excursions/excursions-list/table/ExcursionsHeader";
import ExcursionsTableHead from "@/containers/admin/excursions/excursions-list/table/ExcursionsTableHead";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";

const ExcursionsTable = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const locale = useDateFnsLocale();
  const statuses = useExcursionStatuses();
  const types = useExcursionTypes();

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
  } = useExcursions();

  function handleClick(item: IExcursionListItem) {
    router.push(routerLinks.administrationExcursion(item.id));
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
          Экскурсии не найдены
        </Typography>
      </Stack>
    ) : null;

  const parseStatusColor = (status: ExcursionStatusesEnum) => {
    if (status === ExcursionStatusesEnum.MODERATION) return "warning.main";
    if (status === ExcursionStatusesEnum.APPROVED) return "success.main";
    return "error.main";
  };

  return (
    <Stack width={"100%"} minHeight={"100%"}>
      <FormProvider {...formContext}>
        <ExcursionsHeader onSubmit={onSubmit} />
      </FormProvider>
      <Stack flexGrow={1} sx={{ overflowX: "auto" }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <ExcursionsTableHead
            orderDirection={orderDirection}
            orderBy={orderBy}
            changeOrderBy={changeOrderBy}
            toggleOrderDirection={toggleOrderDirection}
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
                    <Stack gap={"0.2em"}>
                      <Typography variant={"body1"}>{item.title}</Typography>
                      <Typography
                        variant={"body1"}
                        component={Link}
                        color={"secondary.main"}
                        sx={{
                          textDecoration: "underline #565656",
                          wordBreak: "break-word",
                          width: "fit-content",
                        }}
                        onClick={(e) => e.stopPropagation()}
                        href={routerLinks.excursion(item.slug)}
                        target={"_blank"}
                      >
                        {item.slug}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Tooltip
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                      title={
                        <Typography
                          p={"0.5em"}
                          fontSize={"14px"}
                          display={"flex"}
                          flexDirection={"column"}
                          gap={"0.5em"}
                        >
                          {item.places.map((p) => (
                            <span key={p.id}>
                              {p.title}
                              <br />
                            </span>
                          ))}
                        </Typography>
                      }
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        width={"fit-content"}
                        gap={"0.5em"}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography variant={"body1"}>
                          Мест: {item.places.length || 0}
                        </Typography>
                        <InfoOutlinedIcon
                          color={"secondary"}
                          fontSize={"small"}
                        />
                      </Stack>
                    </Tooltip>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Tooltip
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={3000}
                      title={
                        !!item.moderationMessage ? (
                          <Typography p={"0.5em"} fontSize={"14px"}>
                            {item.moderationMessage}
                          </Typography>
                        ) : null
                      }
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"0.5em"}
                        sx={{
                          cursor: !!item.moderationMessage
                            ? "pointer"
                            : undefined,
                        }}
                      >
                        <Box
                          borderRadius={"50%"}
                          height={"10px"}
                          width={"10px"}
                          bgcolor={parseStatusColor(item.status)}
                        />
                        <Typography variant={"body1"}>
                          {statuses.find((s) => s.id === item.status)?.label}
                        </Typography>
                        {!!item.moderationMessage && (
                          <InfoOutlinedIcon
                            color={"secondary"}
                            fontSize={"small"}
                          />
                        )}
                      </Stack>
                    </Tooltip>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant={"body1"}>
                      {types.find((type) => item.type === type.id)?.label ||
                        "-"}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant={"body1"}>
                      {item.authorName || "-"}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant={"body1"}>
                      {format(new Date(item.createdAt), "dd MMM yyyy", {
                        locale,
                      })}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant={"body1"}>
                      {format(new Date(item.updatedAt), "dd MMM yyyy", {
                        locale,
                      })}
                    </Typography>
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

export default ExcursionsTable;
