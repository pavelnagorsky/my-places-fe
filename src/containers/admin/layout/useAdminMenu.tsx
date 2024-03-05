import HouseIcon from "@mui/icons-material/House";
import InterestsIcon from "@mui/icons-material/Interests";
import { ReactElement } from "react";
import { routerLinks } from "@/routing/routerLinks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";

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
      title: "Типы мест",
      href: routerLinks.administrationPlaceTypes,
      icon: <HouseIcon />,
    },
    {
      title: "Категории мест",
      href: routerLinks.administrationPlaceCategories,
      icon: <InterestsIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default useAdminMenu;
