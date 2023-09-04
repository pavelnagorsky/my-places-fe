import { Avatar, Stack, Typography, Link, Divider, Box } from "@mui/material";
import { routerLinks } from "@/staticData/routerLinks";
import SliderMenuLink from "@/components/Header/SliderMenu/SliderMenuLink";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserSection = ({
  onClose,
  pathname,
  firstName,
}: {
  onClose: () => void;
  pathname: string;
  firstName: string;
}) => {
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
        href={routerLinks.photos}
        icon={<AccountCircleIcon fontSize={"small"} color={"secondary"} />}
      />
      <Divider
        variant={"middle"}
        sx={{ borderColor: "primary.main", opacity: 0.5, my: "0.3em" }}
      />
    </Box>
  );
};

export default UserSection;
