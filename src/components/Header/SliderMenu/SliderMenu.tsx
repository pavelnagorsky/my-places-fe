import {
  Divider,
  MenuItem,
  Popover,
  PopoverProps,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useRouter } from "next/router";
import LinksSection from "@/components/Header/SliderMenu/LinksSection";
import { useAppSelector } from "@/store/hooks";
import { selectUserData } from "@/store/user-slice/user.slice";
import LoginSection from "@/components/Header/SliderMenu/LoginSection";
import UserSection from "@/components/Header/SliderMenu/UserSection";

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
  const userData = useAppSelector(selectUserData);

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    onClose();
    router.push({ pathname: router.pathname, query: router.query }, undefined, {
      locale: event.target.value,
    });
  };

  return (
    <Popover
      keepMounted
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
        {userData && (
          <UserSection
            onClose={onClose}
            pathname={pathname}
            firstName={userData.firstName}
          />
        )}
        <LinksSection onClose={onClose} pathname={pathname} />
        {!userData && <LoginSection onClose={onClose} />}
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
