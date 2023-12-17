import HouseIcon from "@mui/icons-material/House";
import InterestsIcon from "@mui/icons-material/Interests";
import { ReactElement } from "react";
import { routerLinks } from "@/staticData/routerLinks";

const useAdminMenu = () => {
  return [
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
