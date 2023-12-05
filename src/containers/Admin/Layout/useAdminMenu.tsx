import HouseIcon from "@mui/icons-material/House";
import InterestsIcon from "@mui/icons-material/Interests";
import { ReactElement } from "react";

const useAdminMenu = () => {
  return [
    {
      title: "Типы мест",
      href: "/administration/place-types",
      icon: <HouseIcon />,
    },
    {
      title: "Категории мест",
      href: "/administration/place-categories",
      icon: <InterestsIcon />,
    },
  ] as { title: string; href: string; icon: ReactElement }[];
};

export default useAdminMenu;
