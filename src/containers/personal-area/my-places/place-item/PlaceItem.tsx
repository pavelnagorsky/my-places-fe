import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { format } from "date-fns";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { routerLinks } from "@/routing/routerLinks";
import usePlaceStatuses from "@/hooks/usePlaceStatuses";
import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import PlaceFullInfo from "@/containers/personal-area/my-places/place-item/PlaceFullInfo";
import MyPlaceMenu from "@/containers/personal-area/my-places/place-item/menu/MyPlaceMenu";
import useMyPlaceMenu from "@/containers/personal-area/my-places/place-item/menu/useMyPlaceMenu";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";

interface IPlaceItemProps {
  place: IMyPlace;
  onDelete: (placeId: number) => void;
}

const PlaceItem = ({ place, onDelete }: IPlaceItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const placeStatuses = usePlaceStatuses();
  const dateFnsLocale = useDateFnsLocale();
  const menu = useMyPlaceMenu({ placeId: place.id, onDelete });
  const [fullOpen, setFullOpen] = useState(false);

  const toggleFull = () => {
    setFullOpen(!fullOpen);
  };

  const showStatusTooltip =
    place.status === PlaceStatusesEnum.REJECTED ||
    place.status === PlaceStatusesEnum.COMMERCIAL_EXPIRED ||
    place.status === PlaceStatusesEnum.NEEDS_PAYMENT;

  const parseStatusColor = (status: PlaceStatusesEnum) => {
    if (status === PlaceStatusesEnum.MODERATION) return "warning.main";
    if (status === PlaceStatusesEnum.APPROVED) return "success.main";
    return "error.main";
  };

  const placeTitleBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{place.title}</Typography>
      <Typography
        variant={"body1"}
        component={Link}
        color={"secondary.main"}
        sx={{ textDecoration: "underline #565656" }}
        href={routerLinks.place(place.slug)}
        target={"_blank"}
      >
        {place.slug}
      </Typography>
    </Stack>
  );

  const placeTypeBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>{place.type}</Typography>
    </Stack>
  );

  const statusInfoBox = (
    <Tooltip
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={9000}
      title={
        place.moderationMessage ? (
          <Typography p={"0.5em"} fontSize={"14px"}>
            {place.moderationMessage}
          </Typography>
        ) : null
      }
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={"0.5em"}
        sx={{ cursor: place.moderationMessage ? "pointer" : undefined }}
      >
        <Box
          borderRadius={"50%"}
          height={"10px"}
          width={"10px"}
          bgcolor={parseStatusColor(place.status)}
        />
        <Typography variant={"body1"}>
          {placeStatuses.find((s) => s.id === place.status)?.label}
        </Typography>
        {showStatusTooltip && (
          <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
        )}
      </Stack>
    </Tooltip>
  );

  const advertisementBox = (
    <Box>
      <Typography variant={"body1"}>
        {place.advertisement ? "Да" : "Нет"}
      </Typography>
      {!!place.advEndDate && (
        <Typography variant={"body1"} mt={"0.2em"}>{`До ${format(
          new Date(place.advEndDate),
          "dd MMM yyyy",
          {
            locale: dateFnsLocale,
          }
        )}`}</Typography>
      )}
    </Box>
  );

  const dateInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(place.createdAt), "dd MMM yyyy", {
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
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Название</CustomLabel>
            {placeTitleBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Тип</CustomLabel>
            {placeTypeBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Статус</CustomLabel>
            {statusInfoBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Коммерция</CustomLabel>
            {advertisementBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Дата создания</CustomLabel>
            {dateInfoBox}
          </Grid>
        </Grid>
        <Stack ml={"0.5em"} justifyContent={"space-between"}>
          <IconButton
            onClick={menu.handleClick}
            color={"secondary"}
            size={"small"}
          >
            <MoreVertIcon />
          </IconButton>
          <MyPlaceMenu
            anchorEl={menu.anchorEl}
            open={menu.open}
            handleClose={menu.handleClose}
            onDelete={menu.handleDelete}
            onEdit={menu.handleEdit}
            placeSlug={place.slug}
          />
          <IconButton color={"primary"} size={"small"} onClick={toggleFull}>
            <ExpandMoreIcon
              sx={{ transform: fullOpen ? "rotate(180deg)" : undefined }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Collapse in={fullOpen}>
        <PlaceFullInfo place={place} />
      </Collapse>
    </Box>
  );

  const desktopView = (
    <Box
      py={"1em"}
      px={"0em"}
      sx={{
        boxShadow: "rgba(32, 31, 61, 0.1) 0px 5px 10px",
        my: "1em",
        borderRadius: "20px",
      }}
    >
      <Grid container spacing={"1em"} alignItems={"center"}>
        <Grid item xs={1}>
          <IconButton
            color={"primary"}
            sx={{ ml: "0.5em" }}
            onClick={toggleFull}
          >
            <ExpandMoreIcon
              sx={{ transform: fullOpen ? "rotate(180deg)" : undefined }}
            />
          </IconButton>
        </Grid>
        <Grid item xs={2.5}>
          {placeTitleBox}
        </Grid>
        <Grid item xs={1.6}>
          {placeTypeBox}
        </Grid>
        <Grid item xs={2.4}>
          {statusInfoBox}
        </Grid>
        <Grid item xs={1.75}>
          {advertisementBox}
        </Grid>
        <Grid item xs={1.75}>
          {dateInfoBox}
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color={"secondary"}
            sx={{ mr: "0.5em" }}
            onClick={menu.handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <MyPlaceMenu
            anchorEl={menu.anchorEl}
            open={menu.open}
            handleClose={menu.handleClose}
            onDelete={menu.handleDelete}
            onEdit={menu.handleEdit}
            placeSlug={place.slug}
          />
        </Grid>
      </Grid>
      <Collapse in={fullOpen}>
        <PlaceFullInfo place={place} />
      </Collapse>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default PlaceItem;
