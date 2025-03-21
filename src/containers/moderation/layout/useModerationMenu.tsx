import PlaceIcon from "@mui/icons-material/Place";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { ReactElement } from "react";
import { routerLinks } from "@/routing/routerLinks";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useTranslation } from "next-i18next";

const useModerationMenu = () => {
  const { t } = useTranslation("moderation");
  return [
    {
      title: t("links.places"),
      href: routerLinks.moderationPlaces,
      icon: <PlaceIcon />,
    },
    {
      title: t("links.reviews"),
      href: routerLinks.moderationReviews,
      icon: <NewspaperIcon />,
    },
    {
      title: t("links.excursions"),
      href: routerLinks.moderationExcursions,
      icon: <TravelExploreIcon />,
    },
    {
      title: t("links.reports"),
      href: routerLinks.moderationReports,
      icon: <FlagCircleIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default useModerationMenu;
