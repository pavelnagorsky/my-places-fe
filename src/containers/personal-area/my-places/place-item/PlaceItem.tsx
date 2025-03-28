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
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { routerLinks } from "@/routing/routerLinks";
import usePlaceStatuses from "@/hooks/usePlaceStatuses";
import { PlaceStatusesEnum } from "@/services/places-service/enums/place-statuses.enum";
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
  const { t } = useTranslation(["personal-area", "common"]);
  const placeStatuses = usePlaceStatuses();
  const dateFnsLocale = useDateFnsLocale();
  const menu = useMyPlaceMenu({ placeId: place.id, onDelete });
  const [fullOpen, setFullOpen] = useState(false);

  const Menu = (
    <MyPlaceMenu
      status={place.status}
      anchorEl={menu.popover.anchor}
      open={menu.popover.open}
      handleClose={menu.popover.handleClose}
      onDelete={menu.handleDelete}
      onEdit={menu.handleEdit}
      placeSlug={place.slug}
      onAddReview={menu.handleAddReview}
    />
  );

  const toggleFull = () => {
    setFullOpen(!fullOpen);
  };

  const parseTooltipText = (): string | null => {
    if (place.status === PlaceStatusesEnum.REJECTED)
      return place.moderationMessage;
    if (place.status === PlaceStatusesEnum.NEEDS_PAYMENT)
      return t("places.feedback.needsPayment");
    if (place.status === PlaceStatusesEnum.COMMERCIAL_EXPIRED)
      return t("places.feedback.commercialExpired");
    return null;
  };
  const tooltipText = parseTooltipText();

  const parseStatusColor = (status: PlaceStatusesEnum) => {
    if (
      status === PlaceStatusesEnum.MODERATION ||
      status === PlaceStatusesEnum.NEEDS_PAYMENT
    )
      return "warning.main";
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
        sx={{
          textDecoration: "underline #565656",
          wordBreak: "break-word",
          width: "fit-content",
        }}
        href={routerLinks.place(place.slug)}
        target={"_blank"}
      >
        {place.slug}
      </Typography>
    </Stack>
  );

  const placeTypeBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"} sx={{ wordBreak: "break-word" }}>
        {place.type}
      </Typography>
    </Stack>
  );

  const statusInfoBox = (
    <Tooltip
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={3000}
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
        sx={{ cursor: tooltipText ? "pointer" : undefined }}
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
        {tooltipText && (
          <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
        )}
      </Stack>
    </Tooltip>
  );

  const advertisementBox = (
    <Box>
      <Typography variant={"body1"}>
        {place.advertisement
          ? t("buttons.yes", { ns: "common" })
          : t("buttons.no", { ns: "common" })}
      </Typography>
      {!!place.advEndDate && (
        <Typography variant={"body1"} mt={"0.2em"}>{`${t("filters.to", {
          ns: "common",
        })} ${format(new Date(place.advEndDate), "dd MMM yyyy", {
          locale: dateFnsLocale,
        })}`}</Typography>
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
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.title")}</CustomLabel>
            {placeTitleBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.type")}</CustomLabel>
            {placeTypeBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.status")}</CustomLabel>
            {statusInfoBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.commercial")}</CustomLabel>
            {advertisementBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("places.headings.createdAt")}</CustomLabel>
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
        <Grid size={{ xs: 1 }}>
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
        <Grid size={{ xs: 2.5 }}>{placeTitleBox}</Grid>
        <Grid size={{ xs: 1.6 }}>{placeTypeBox}</Grid>
        <Grid size={{ xs: 2.4 }}>{statusInfoBox}</Grid>
        <Grid size={{ xs: 1.75 }}>{advertisementBox}</Grid>
        <Grid size={{ xs: 1.75 }}>{dateInfoBox}</Grid>
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
      <Collapse in={fullOpen}>
        <PlaceFullInfo place={place} />
      </Collapse>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default PlaceItem;
