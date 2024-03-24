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
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import usePlaces from "@/containers/admin/places/usePlaces";
import PlacesHeader from "@/containers/admin/places/table/PlacesHeader";
import PlacesTableHead from "@/containers/admin/places/table/PlacesTableHead";
import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";
import { routerLinks } from "@/routing/routerLinks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import usePlaceStatuses from "@/hooks/usePlaceStatuses";

const PlacesTable = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const locale = useDateFnsLocale();
  const placeStatuses = usePlaceStatuses();

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
  } = usePlaces();

  function handleClick(item: IMyPlace) {
    router.push(`/administration/places/${item.id}`);
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
          Места не найдены
        </Typography>
      </Stack>
    ) : null;

  const parseStatusColor = (status: PlaceStatusesEnum) => {
    if (
      status === PlaceStatusesEnum.MODERATION ||
      status === PlaceStatusesEnum.NEEDS_PAYMENT
    )
      return "warning.main";
    if (status === PlaceStatusesEnum.APPROVED) return "success.main";
    return "error.main";
  };

  return (
    <Stack width={"100%"} minHeight={"100%"}>
      <FormProvider {...formContext}>
        <PlacesHeader onSubmit={onSubmit} />
      </FormProvider>
      <Stack flexGrow={1} sx={{ overflowX: "auto" }}>
        <Table stickyHeader aria-labelledby="tableTitle">
          <PlacesTableHead
            orderDirection={orderDirection}
            orderBy={orderBy}
            changeOrderBy={changeOrderBy}
            toggleOrderDirection={toggleOrderDirection}
          />
          <TableBody>
            {items.map((item, index) => {
              const parseTooltipText = (): string | null => {
                if (item.status === PlaceStatusesEnum.REJECTED)
                  return item.moderationMessage;
                if (item.status === PlaceStatusesEnum.NEEDS_PAYMENT)
                  return "Cогласно правилам данного сайта, созданное Вами Место признано коммерческим, поэтому для его публикации необходимо провести оплату, согласно тарифу на рекламные услуги.";
                if (item.status === PlaceStatusesEnum.COMMERCIAL_EXPIRED)
                  return "Срок действия рекламы созданного Вами коммерческого Места истек. Для возобновления публикации на сайте, необходимо провести оплату, согласно тарифу на рекламные услуги.";
                return null;
              };
              const tooltipText = parseTooltipText();

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
                        }}
                        onClick={(e) => e.stopPropagation()}
                        href={routerLinks.place(item.slug)}
                        target={"_blank"}
                      >
                        {item.slug}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant={"body1"}>{item.type}</Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Tooltip
                      arrow
                      enterTouchDelay={0}
                      leaveTouchDelay={9000}
                      title={
                        tooltipText ? (
                          <Typography p={"0.5em"} fontSize={"14px"}>
                            {tooltipText}
                          </Typography>
                        ) : null
                      }
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"0.5em"}
                        sx={{
                          cursor: tooltipText ? "pointer" : undefined,
                        }}
                      >
                        <Box
                          borderRadius={"50%"}
                          height={"10px"}
                          width={"10px"}
                          bgcolor={parseStatusColor(item.status)}
                        />
                        <Typography variant={"body1"}>
                          {
                            placeStatuses.find((s) => s.id === item.status)
                              ?.label
                          }
                        </Typography>
                        {tooltipText && (
                          <InfoOutlinedIcon
                            color={"secondary"}
                            fontSize={"small"}
                          />
                        )}
                      </Stack>
                    </Tooltip>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Box>
                      <Typography variant={"body1"}>
                        {item.advertisement ? "Да" : "Нет"}
                      </Typography>
                      {!!item.advEndDate && (
                        <Typography
                          variant={"body1"}
                          mt={"0.2em"}
                        >{`До ${format(
                          new Date(item.advEndDate),
                          "dd MMM yyyy",
                          {
                            locale,
                          }
                        )}`}</Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant={"body1"}>
                      {format(new Date(item.createdAt), "dd MMM yyyy", {
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

export default PlacesTable;
