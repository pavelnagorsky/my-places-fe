import { Divider, Popover, PopoverProps, Stack } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectUserData } from "@/store/user-slice/user.slice";
import LinksSection from "@/components/header/slider-menu/LinksSection";
import LoginSection from "@/components/header/slider-menu/LoginSection";
import UserSection from "@/components/header/slider-menu/UserSection";
import LanguageSection from "@/components/header/slider-menu/LanguageSection";

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
  const userData = useAppSelector(selectUserData);

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
        <LanguageSection onClose={onClose} />
      </Stack>
    </Popover>
  );
};

export default SliderMenu;
