import PlaceIcon from "@mui/icons-material/Place";
import SettingsIcon from "@mui/icons-material/Settings";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { ReactElement } from "react";
import { routerLinks } from "@/routing/routerLinks";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useTranslation } from "next-i18next";

const usePersonalAreaMenu = () => {
  const { t } = useTranslation("personal-area");
  return [
    {
      title: t("links.profile"),
      href: routerLinks.personalAreaSettings,
      icon: <SettingsIcon />,
    },
    {
      title: t("links.favourites"),
      href: routerLinks.personalAreaFavourites,
      icon: <BookmarkBorderIcon />,
    },
    {
      title: t("links.places"),
      href: routerLinks.personalAreaPlaces,
      icon: <PlaceIcon />,
    },
    {
      title: t("links.reviews"),
      href: routerLinks.personalAreaReviews,
      icon: <NewspaperIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default usePersonalAreaMenu;
