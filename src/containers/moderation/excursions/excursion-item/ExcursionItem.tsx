import {
  Box,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { routerLinks } from "@/routing/routerLinks";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import useExcursionStatuses from "@/containers/personal-area/my-excursions/logic/utils/useExcursionStatuses";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";
import { IExcursionModerationItem } from "@/services/excursions-service/interfaces/excursion-moderation-item.interface";

interface IExcursionItemProps {
  item: IExcursionModerationItem;
}

const ExcursionItem = ({ item }: IExcursionItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation(["moderation", "common"]);
  const dateFnsLocale = useDateFnsLocale();
  const statuses = useExcursionStatuses();
  const types = useExcursionTypes();

  const titleBox = (
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
        href={routerLinks.excursion(item.slug)}
        target={"_blank"}
      >
        {item.slug}
      </Typography>
    </Stack>
  );

  const placesInfoBox = (
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
          {t("excursions.headings.placesCount", { count: item.places.length })}
        </Typography>
        <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
      </Stack>
    </Tooltip>
  );

  const typeBox = (
    <Typography variant={"body1"}>
      {types.find((type) => type.id === item.type)?.label || "-"}
    </Typography>
  );

  const dateInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(item.createdAt), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}
      </Typography>
    </Stack>
  );

  const mobileView = (
    <Box
      sx={{
        mb: "2em",
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        p: "1.5em",
        borderRadius: "20px",
        "& label": {
          mb: "0.3em",
        },
      }}
    >
      <Grid container spacing={"1em"}>
        <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
          <CustomLabel>{t("excursions.headings.title")}</CustomLabel>
          {titleBox}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
          <CustomLabel>{t("excursions.headings.places")}</CustomLabel>
          {placesInfoBox}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
          <CustomLabel>{t("excursions.headings.duration")}</CustomLabel>
          {typeBox}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
          <CustomLabel>{t("excursions.headings.createdAt")}</CustomLabel>
          {dateInfoBox}
        </Grid>
      </Grid>
    </Box>
  );

  const desktopView = (
    <Box
      py={"1em"}
      pl={"1em"}
      sx={{
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        my: "1em",
        borderRadius: "20px",
      }}
    >
      <Grid container spacing={"1em"} alignItems={"center"}>
        <Grid size={{ xs: 3 }}>{titleBox}</Grid>
        <Grid size={{ xs: 2 }}>{placesInfoBox}</Grid>
        <Grid size={{ xs: 2 }}></Grid>
        <Grid size={{ xs: 1.5 }}>{typeBox}</Grid>
        <Grid size={{ xs: 1.5 }}>{dateInfoBox}</Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default ExcursionItem;
