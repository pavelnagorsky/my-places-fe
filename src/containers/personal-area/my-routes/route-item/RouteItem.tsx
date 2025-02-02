import {
  Box,
  Collapse,
  IconButton,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import useMyRouteMenu from "@/containers/personal-area/my-routes/route-item/menu/useMyRouteMenu";
import MyRouteMenu from "@/containers/personal-area/my-routes/route-item/menu/MyRouteMenu";
import utils from "@/shared/utils";

interface IRouteItemProps {
  route: IRoute;
  onDelete: (routeId: number) => void;
}

const RouteItem = ({ route, onDelete }: IRouteItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation(["personal-area", "common"]);
  const dateFnsLocale = useDateFnsLocale();
  const menu = useMyRouteMenu({ route: route, onDelete });
  const [fullOpen, setFullOpen] = useState(false);

  const formattedDistance = utils.formatKM(route.distance, i18n.language);
  const formattedDuration = utils.formatMinutes(route.duration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });

  const Menu = (
    <MyRouteMenu
      anchorEl={menu.popover.anchor}
      open={menu.popover.open}
      handleClose={menu.popover.handleClose}
      onDelete={menu.handleDelete}
      onEdit={menu.handleEdit}
      onOpenGoogleNavigator={menu.handleOpenGoogleNavigator}
      onOpenYandexNavigator={menu.handleOpenYandexNavigator}
    />
  );

  const toggleFull = () => {
    setFullOpen(!fullOpen);
  };

  const routeTitleBox = (
    <Typography variant={"body1"}>{route.title}</Typography>
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
          {route.places.map((p) => (
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
          {t("routes.headings.placesCount", { count: route.places.length })}
        </Typography>
        <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
      </Stack>
    </Tooltip>
  );

  const routeDistanceBox = (
    <Typography variant={"body1"}>{formattedDistance}</Typography>
  );

  const routeDurationBox = (
    <Typography variant={"body1"}>{formattedDuration}</Typography>
  );

  const dateInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(route.createdAt), "dd MMM yyyy", {
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
      <Stack direction={"row"}>
        <Grid container spacing={"1em"}>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("routes.headings.title")}</CustomLabel>
            {routeTitleBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("routes.headings.places")}</CustomLabel>
            {placesInfoBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("routes.headings.distance")}</CustomLabel>
            {routeDistanceBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("routes.headings.duration")}</CustomLabel>
            {routeDurationBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("routes.headings.createdAt")}</CustomLabel>
            {dateInfoBox}
          </Grid>
        </Grid>
        <Stack ml={"0.5em"} justifyContent={"space-between"}>
          <IconButton
            onClick={menu.popover.handleOpen}
            color={"secondary"}
            size={"small"}
          >
            <MoreVertIcon />
          </IconButton>
          {Menu}
        </Stack>
      </Stack>
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
        <Grid size={{ xs: 3 }}>{routeTitleBox}</Grid>
        <Grid size={{ xs: 2 }}>{placesInfoBox}</Grid>
        <Grid size={{ xs: 2 }}>{routeDistanceBox}</Grid>
        <Grid size={{ xs: 2 }}>{routeDurationBox}</Grid>
        <Grid size={{ xs: 2 }}>{dateInfoBox}</Grid>
        <Grid size={{ xs: 1 }}>
          <IconButton
            color={"secondary"}
            sx={{ mr: "0.5em" }}
            onClick={menu.popover.handleOpen}
          >
            <MoreVertIcon />
          </IconButton>
          {Menu}
        </Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default RouteItem;
