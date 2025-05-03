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
import useMyExcursionMenu from "@/containers/personal-area/my-excursions/excursion-item/content/menu/useMyExcursionMenu";
import MyExcursionMenu from "@/containers/personal-area/my-excursions/excursion-item/content/menu/MyExcursionMenu";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";
import ExcursionAdditionalInfo from "@/containers/personal-area/my-excursions/excursion-item/content/ExcursionAdditionalInfo";
import useExcursionStatuses from "@/containers/personal-area/my-excursions/logic/utils/useExcursionStatuses";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";

interface IExcursionItemProps {
  item: IExcursionListItem;
  onDelete: (id: number) => void;
}

const ExcursionItem = ({ item, onDelete }: IExcursionItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation(["personal-area", "common"]);
  const dateFnsLocale = useDateFnsLocale();
  const statuses = useExcursionStatuses();
  const types = useExcursionTypes();
  const menu = useMyExcursionMenu({ item, onDelete });
  const [fullOpen, setFullOpen] = useState(false);

  const Menu = (
    <MyExcursionMenu
      slug={item.slug}
      anchorEl={menu.popover.anchor}
      open={menu.popover.open}
      handleClose={menu.popover.handleClose}
      onDelete={menu.handleDelete}
      onEdit={menu.handleEdit}
      onOpenGoogleNavigator={menu.handleOpenGoogleNavigator}
      onOpenYandexNavigator={menu.handleOpenYandexNavigator}
      canView={menu.canView}
    />
  );

  const toggleFull = () => {
    setFullOpen(!fullOpen);
  };

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

  const status = statuses.find((s) => s.id === item.status);
  const statusInfoBox = (
    <Tooltip
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={3000}
      title={
        item.moderationMessage ? (
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
        sx={{ cursor: item.moderationMessage ? "pointer" : undefined }}
      >
        <Box
          borderRadius={"50%"}
          height={"10px"}
          width={"10px"}
          bgcolor={status?.color}
        />
        <Typography variant={"body1"}>{status?.label}</Typography>
        {!!item.moderationMessage && (
          <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
        )}
      </Stack>
    </Tooltip>
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
            <CustomLabel>{t("excursions.headings.title")}</CustomLabel>
            {titleBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("excursions.headings.places")}</CustomLabel>
            {placesInfoBox}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} gap={"0.5em"}>
            <CustomLabel>{t("excursions.headings.distance")}</CustomLabel>
            {statusInfoBox}
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
        <ExcursionAdditionalInfo item={item} />
      </Collapse>
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
        <Grid size={{ xs: 3 }}>{titleBox}</Grid>
        <Grid size={{ xs: 2 }}>{placesInfoBox}</Grid>
        <Grid size={{ xs: 2 }}>{statusInfoBox}</Grid>
        <Grid size={{ xs: 1.5 }}>{typeBox}</Grid>
        <Grid size={{ xs: 1.5 }}>{dateInfoBox}</Grid>
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
        <ExcursionAdditionalInfo item={item} />
      </Collapse>
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default ExcursionItem;
