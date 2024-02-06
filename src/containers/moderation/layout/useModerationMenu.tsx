import PlaceIcon from "@mui/icons-material/Place";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { ReactElement } from "react";
import { routerLinks } from "@/routing/routerLinks";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";

const useModerationMenu = () => {
  return [
    {
      title: "Места",
      href: routerLinks.moderationPlaces,
      icon: <PlaceIcon />,
    },
    {
      title: "Заметки",
      href: routerLinks.moderationReviews,
      icon: <NewspaperIcon />,
    },
    {
      title: "Жалобы",
      href: routerLinks.moderationReports,
      icon: <FlagCircleIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default useModerationMenu;
