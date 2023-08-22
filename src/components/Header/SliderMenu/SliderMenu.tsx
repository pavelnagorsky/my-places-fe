import {
  Button,
  Divider,
  MenuItem,
  Popover,
  PopoverProps,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LanguageIcon from "@mui/icons-material/Language";
import { routerLinks } from "@/staticData/routerLinks";
import { useRouter } from "next/router";
import SliderMenuLink from "@/components/Header/SliderMenu/SliderMenuLink";

interface ISliderMenuProps extends PopoverProps {
  onClose: () => void;
  pathname: string;
}

const SliderMenu = ({
  id,
  open,
  onClose,
  anchorEl,
  pathname,
}: ISliderMenuProps) => {
  const router = useRouter();

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    onClose();
    router.push("", undefined, { locale: event.target.value });
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: -10,
        horizontal: "center",
      }}
    >
      <Stack minWidth={"203px"} px={"1em"} py={"1.5em"}>
        <SliderMenuLink
          pathname={pathname}
          onClick={onClose}
          text={"О стране"}
          href={routerLinks.aboutCountry}
          icon={
            <CollectionsOutlinedIcon fontSize={"small"} color={"secondary"} />
          }
        />
        <SliderMenuLink
          pathname={pathname}
          onClick={onClose}
          text={"Обратная связь"}
          href={routerLinks.contactUs}
          icon={<ForumOutlinedIcon fontSize={"small"} color={"secondary"} />}
        />
        <Divider
          variant={"middle"}
          sx={{ borderColor: "primary.main", opacity: 0.5, my: "0.3em" }}
        />
        <Button
          sx={{
            textTransform: "none",
            justifyContent: "start",
            columnGap: "0.5em",
            color: "secondary.main",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={onClose}
        >
          <LoginIcon fontSize={"small"} color={"secondary"} />
          <Typography>Войти</Typography>
        </Button>
        <Button
          sx={{
            textTransform: "none",
            justifyContent: "start",
            columnGap: "0.5em",
            color: "secondary.main",
            "&:hover": {
              color: "primary.main",
            },
          }}
          onClick={onClose}
        >
          <PersonAddAlt1Icon fontSize={"small"} color={"secondary"} />
          <Typography>Зарегистрироваться</Typography>
        </Button>
        <Divider
          variant={"middle"}
          sx={{ borderColor: "primary.main", opacity: 0.5, my: "0.3em" }}
        />
        <Stack
          direction={"row"}
          columnGap={"0.5em"}
          alignItems={"center"}
          p={"6px 8px"}
        >
          <LanguageIcon color={"primary"} />
          <Select
            sx={{
              "& svg": {
                fill: "#FF7A00",
              },
              color: "secondary.main",
            }}
            color={"primary"}
            disableUnderline
            variant={"standard"}
            id="language-select"
            value={router.locale}
            onChange={handleChangeLanguage}
          >
            <MenuItem value={"ru"}>Русский</MenuItem>
            <MenuItem value={"en"}>English</MenuItem>
          </Select>
        </Stack>
      </Stack>
    </Popover>
  );
};

export default SliderMenu;
