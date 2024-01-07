import PlaceIcon from "@mui/icons-material/Place";
import SettingsIcon from "@mui/icons-material/Settings";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { ReactElement } from "react";
import { routerLinks } from "@/routing/routerLinks";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const usePersonalAreaMenu = () => {
  return [
    {
      title: "Профиль",
      href: routerLinks.personalAreaSettings,
      icon: <SettingsIcon />,
    },
    {
      title: "Избранное",
      href: routerLinks.personalAreaFavourites,
      icon: <BookmarkBorderIcon />,
    },
    {
      title: "Мои места",
      href: routerLinks.personalAreaPlaces,
      icon: <PlaceIcon />,
    },
    {
      title: "Мои заметки",
      href: routerLinks.personalAreaReviews,
      icon: <NewspaperIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default usePersonalAreaMenu;
