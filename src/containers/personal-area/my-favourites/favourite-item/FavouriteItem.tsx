import { IFavourite } from "@/services/places-service/interfaces/favourite.interface";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Popover,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { routerLinks } from "@/routing/routerLinks";
import { format } from "date-fns";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import usePopover from "@/hooks/usePopover";
import placesService from "@/services/places-service/places.service";

interface IFavouriteItemProps {
  favourite: IFavourite;
  onDelete: (favId: number) => void;
}

const FavouriteItem = ({ favourite, onDelete }: IFavouriteItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const dateFnsLocale = useDateFnsLocale();
  const [isActual, setIsActual] = useState(favourite.actual);
  const popover = usePopover("confirm-favourite-delete");

  const onChangeActual = () => {
    setIsActual(!isActual);
    placesService
      .toggleFavouriteIsActual(favourite.id)
      .then(() => {})
      .catch(() => {});
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
        Вы уверены?
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
          Удалить
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
            leaveTouchDelay={6000}
            sx={{ fontSize: "16px", alignSelf: "center" }}
            title={
              <Typography p={"0.5em"} fontSize={"14px"}>
                Актуальные записи будут первыми в списке
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
        label={isActual ? "Да" : "Нет"}
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
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Место</CustomLabel>
            {favTitleBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Ссылка</CustomLabel>
            {favSlugBox}
          </Grid>
          <Grid item xs={12} sm={6} gap={"0.5em"}>
            <CustomLabel>Дата добавления</CustomLabel>
            {dateInfoBox}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            gap={"0.5em"}
            display={"flex"}
            alignItems={"center"}
          >
            <CustomLabel>Актуальность</CustomLabel>
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
        <Grid item xs={2}>
          {favIsActualBox}
        </Grid>
        <Grid item xs={3}>
          {favTitleBox}
        </Grid>
        <Grid item xs={3.5}>
          {favSlugBox}
        </Grid>
        <Grid item xs={2.5}>
          {dateInfoBox}
        </Grid>
        <Grid item xs={1}>
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
