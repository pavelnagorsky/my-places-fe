import PlaceIcon from "@mui/icons-material/Place";
import SettingsIcon from "@mui/icons-material/Settings";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { ReactElement } from "react";

const usePersonalAreaMenu = () => {
  return [
    {
      title: "Профиль",
      href: "/personal-area/settings",
      icon: <SettingsIcon />,
    },
    {
      title: "Мои места",
      href: "/personal-area/places",
      icon: <PlaceIcon />,
    },
    {
      title: "Мои заметки",
      href: "/personal-area/reviews",
      icon: <NewspaperIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default usePersonalAreaMenu;
