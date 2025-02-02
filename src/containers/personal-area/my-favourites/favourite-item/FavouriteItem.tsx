import { IFavourite } from "@/services/places-service/interfaces/favourite.interface";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Popover,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "next-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { routerLinks } from "@/routing/routerLinks";
import { format } from "date-fns";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import usePopover from "@/hooks/usePopover";
import placesService from "@/services/places-service/places.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectActualPlaceIds,
  toggleActualPlaceId,
} from "@/store/personal-area/favourites-slice/favourites.slice";

interface IFavouriteItemProps {
  favourite: IFavourite;
  onDelete: (favId: number) => void;
}

const FavouriteItem = ({ favourite, onDelete }: IFavouriteItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation(["personal-area", "common"]);
  const dateFnsLocale = useDateFnsLocale();
  const popover = usePopover("confirm-favourite-delete");
  const dispatch = useAppDispatch();
  const actualIds = useAppSelector(selectActualPlaceIds);
  const isActual = actualIds.includes(favourite.placeId);

  const onChangeActual = () => {
    placesService
      .toggleFavouriteIsActual(favourite.id, { isActual: !isActual })
      .then(() => {})
      .catch(() => {});
    dispatch(toggleActualPlaceId({ id: favourite.placeId, add: !isActual }));
  };

  const deleteConfirm = (
    <Popover
      open={popover.open}
      id={popover.id}
      anchorEl={popover.anchor}
      onClose={popover.handleClose}
      PaperProps={{
        sx: {
          p: "1em",
          borderRadius: "15px",
        },
      }}
    >
      <Typography fontSize={"16px"} fontWeight={500}>
        {t("confirmText")}
      </Typography>
      <Divider sx={{ borderColor: "divider", my: "0.5em" }} />
      <Stack direction={"row"} justifyContent={"center"} mt={1}>
        <Button
          variant={"contained"}
          color={"error"}
          sx={{ textTransform: "none", fontSize: 16 }}
          onClick={() => {
            popover.handleClose();
            onDelete(favourite.id);
          }}
        >
          {t("buttons.delete", { ns: "common" })}
        </Button>
      </Stack>
    </Popover>
  );

  const favIsActualBox = (
    <Box>
      <FormControlLabel
        control={
          <Tooltip
            arrow
            enterTouchDelay={0}
            sx={{ fontSize: "16px", alignSelf: "center" }}
            title={
              <Typography p={"0.5em"} fontSize={"14px"}>
                {t("favourites.isActualTooltip")}
              </Typography>
            }
          >
            <Checkbox
              checked={isActual}
              onChange={onChangeActual}
              name="actual"
            />
          </Tooltip>
        }
        label={
          isActual
            ? t("buttons.yes", { ns: "common" })
            : t("buttons.no", { ns: "common" })
        }
      />
    </Box>
  );

  const favTitleBox = (
    <Stack>
      <Typography variant={"body1"}>{favourite.placeTitle}</Typography>
    </Stack>
  );

  const favSlugBox = (
    <Stack>
      <Typography
        variant={"body1"}
        component={Link}
        color={"secondary.main"}
        sx={{ textDecoration: "underline #565656", wordBreak: "break-word" }}
        href={routerLinks.place(favourite.placeSlug)}
        target={"_blank"}
      >
        {favourite.placeSlug}
      </Typography>
    </Stack>
  );

  const dateInfoBox = (
    <Stack gap={"0.2em"}>
      <Typography variant={"body1"}>
        {format(new Date(favourite.createdAt), "dd MMM yyyy", {
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
            <CustomLabel>{t("favourites.headings.place")}</CustomLabel>
            {favTitleBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("favourites.headings.link")}</CustomLabel>
            {favSlugBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("favourites.headings.date")}</CustomLabel>
            {dateInfoBox}
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            gap={"0.5em"}
            display={"flex"}
            alignItems={"center"}
          >
            <CustomLabel>{t("favourites.headings.actuality")}</CustomLabel>
            {favIsActualBox}
          </Grid>
        </Grid>
        <Stack ml={"0.5em"} justifyContent={"space-between"}>
          <IconButton
            onClick={popover.handleOpen}
            color={"error"}
            size={"small"}
          >
            <DeleteForeverIcon />
          </IconButton>
          {deleteConfirm}
        </Stack>
      </Stack>
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
      <Grid container pl={"1em"} spacing={"1em"} alignItems={"center"}>
        <Grid size={{ xs: 2 }}>{favIsActualBox}</Grid>
        <Grid size={{ xs: 3 }}>{favTitleBox}</Grid>
        <Grid size={{ xs: 3.5 }}>{favSlugBox}</Grid>
        <Grid size={{ xs: 2.5 }}>{dateInfoBox}</Grid>
        <Grid size={{ xs: 1 }}>
          <IconButton
            color={"error"}
            //sx={{ mr: "0.5em" }}
            onClick={popover.handleOpen}
          >
            <DeleteForeverIcon />
          </IconButton>
          {deleteConfirm}
        </Grid>
      </Grid>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default FavouriteItem;
