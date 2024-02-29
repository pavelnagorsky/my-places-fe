import { Avatar, Stack, Typography, Link, Divider, Box } from "@mui/material";
import { routerLinks } from "@/routing/routerLinks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAppDispatch } from "@/store/hooks";
import { logoutThunk } from "@/store/user-slice/thunks";
import SliderMenuLink from "@/components/header/slider-menu/SliderMenuLink";
import BuildIcon from "@mui/icons-material/Build";

const UserSection = ({
  onClose,
  pathname,
  firstName,
}: {
  onClose: () => void;
  pathname: string;
  firstName: string;
}) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    onClose();
    dispatch(logoutThunk());
  };

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
          Выйти
        </Link>
      </Stack>
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Личный кабинет"}
        href={routerLinks.personalAreaPlaces}
        icon={<AccountCircleIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Модерация"}
        href={routerLinks.moderationPlaces}
        icon={<BuildIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Администрация"}
        href={routerLinks.administrationUsers}
        icon={<AdminPanelSettingsIcon fontSize={"small"} color={"secondary"} />}
      />
      <Divider
        variant={"middle"}
        sx={{ borderColor: "primary.main", opacity: 0.5, my: "0.3em" }}
      />
    </Box>
  );
};

export default UserSection;
