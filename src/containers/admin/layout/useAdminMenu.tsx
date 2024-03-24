import CastleIcon from "@mui/icons-material/Castle";
import InterestsIcon from "@mui/icons-material/Interests";
import { ReactElement } from "react";
import { routerLinks } from "@/routing/routerLinks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";
import PlaceIcon from "@mui/icons-material/Place";

const useAdminMenu = () => {
  return [
    {
      title: "Пользователи",
      href: routerLinks.administrationUsers,
      icon: <PeopleAltIcon />,
    },
    {
      title: "Обратная связь",
      href: routerLinks.administrationFeedbackList,
      icon: <ChatIcon />,
    },
    {
      title: "Места",
      href: routerLinks.administrationPlaces,
      icon: <PlaceIcon />,
    },
    {
      title: "Типы мест",
      href: routerLinks.administrationPlaceTypes,
      icon: <CastleIcon />,
    },
    {
      title: "Категории мест",
      href: routerLinks.administrationPlaceCategories,
      icon: <InterestsIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default useAdminMenu;
