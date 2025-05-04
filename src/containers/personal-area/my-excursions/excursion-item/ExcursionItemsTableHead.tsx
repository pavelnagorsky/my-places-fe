import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SortingButton from "@/components/UI/sorting-button/SortingButton";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

import { MyExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";

interface ITableHeadProps {
  show: boolean;
  orderBy: MyExcursionsOrderByEnum;
  orderDirection: OrderDirectionsEnum;
  onChangeOrderBy: (field: MyExcursionsOrderByEnum) => void;
  onChangeOrderDirection: () => void;
}

const ExcursionItemsTableHead = ({
  show,
  orderDirection,
  orderBy,
  onChangeOrderBy,
  onChangeOrderDirection,
}: ITableHeadProps) => {
  const { t } = useTranslation("personal-area");
  return (
    <Box
      mx={"0.5em"}
      mb={"-0.5em"}
      display={{ xs: "none", md: show ? "block" : "none" }}
    >
      <Grid
        pl={"1em"}
        container
        spacing={"1em"}
        fontSize={"14px"}
        textTransform={"uppercase"}
        alignItems={"center"}
        sx={{
          "& p": { fontWeight: 700, fontSize: "12px", color: "secondary.main" },
        }}
      >
        <Grid size={{ xs: 1 }} />
        <Grid size={{ xs: 3 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyExcursionsOrderByEnum.TITLE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyExcursionsOrderByEnum.TITLE)
            }
          >
            <Typography>{t("excursions.headings.title")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Typography>{t("excursions.headings.places")}</Typography>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyExcursionsOrderByEnum.STATUS}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyExcursionsOrderByEnum.STATUS)
            }
          >
            <Typography>{t("excursions.headings.status")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: 1.5 }}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyExcursionsOrderByEnum.TYPE}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyExcursionsOrderByEnum.TYPE)
            }
          >
            <Typography>{t("excursions.headings.type")}</Typography>
          </SortingButton>
        </Grid>
        <Grid size={{ xs: "auto" }} display={"flex"} alignItems={"center"}>
          <SortingButton
            orderDirection={orderDirection}
            isActive={orderBy === MyExcursionsOrderByEnum.CREATED_AT}
            onChangeDirection={onChangeOrderDirection}
            onChangeOrderBy={() =>
              onChangeOrderBy(MyExcursionsOrderByEnum.CREATED_AT)
            }
          >
            <Typography>{t("excursions.headings.createdAt")}</Typography>
          </SortingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExcursionItemsTableHead;
