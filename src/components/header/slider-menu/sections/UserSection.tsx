import { Avatar, Box, Divider, Link, Stack, Typography } from "@mui/material";
import { routerLinks } from "@/routing/routerLinks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAppDispatch } from "@/store/hooks";
import { logoutThunk } from "@/store/user-slice/thunks";
import SliderMenuLink from "@/components/header/slider-menu/sections/SliderMenuLink";
import BuildIcon from "@mui/icons-material/Build";
import useRoleAccess from "@/hooks/useRoleAccess";
import RolesEnum from "@/services/auth-service/enums/roles.enum";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

const UserSection = ({
  onClose,
  pathname,
  firstName,
}: {
  onClose: () => void;
  pathname: string;
  firstName: string;
}) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const sendAnalytics = useAnalytics();
  const onLogout = () => {
    onClose();
    sendAnalytics(AnalyticsEventsEnum.CustomClick, { title: "logout" });
    dispatch(logoutThunk());
  };
  const isModerator = useRoleAccess([RolesEnum.MODERATOR, RolesEnum.ADMIN]);
  const isAdmin = useRoleAccess([RolesEnum.ADMIN]);

  return (
    <Box>
      <Stack
        direction={"row"}
        px={"0.5em"}
        mb={"0.5em"}
        gap={"0.5em"}
        alignItems={"center"}
      >
        <Avatar sx={{ borderRadius: "25%", width: 35, height: 35 }}>
          {firstName?.slice(0, 1)}
        </Avatar>
        <Typography
          maxWidth={"120px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          flexGrow={1}
        >
          {firstName}
        </Typography>
        <Link
          onClick={onLogout}
          sx={{
            cursor: "pointer",
          }}
        >
          {t("links.logout")}
        </Link>
      </Stack>
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={t("links.personalArea")}
        href={routerLinks.personalAreaPlaces}
        icon={<AccountCircleIcon fontSize={"small"} color={"secondary"} />}
      />
      {isModerator && (
        <SliderMenuLink
          pathname={pathname}
          onClick={onClose}
          text={t("links.moderation")}
          href={routerLinks.moderationPlaces}
          icon={<BuildIcon fontSize={"small"} color={"secondary"} />}
        />
      )}
      {isAdmin && (
        <SliderMenuLink
          pathname={pathname}
          onClick={onClose}
          text={t("links.administration")}
          href={routerLinks.administrationUsers}
          icon={
            <AdminPanelSettingsIcon fontSize={"small"} color={"secondary"} />
          }
        />
      )}
      <Divider
        variant={"middle"}
        sx={{ borderColor: "primary.main", opacity: 0.5, my: "0.3em" }}
      />
    </Box>
  );
};

export default UserSection;
