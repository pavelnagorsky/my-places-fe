import { useMediaQuery, useTheme } from "@mui/material";
import { Fragment } from "react";
import { routerLinks } from "@/routing/routerLinks";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CommentIcon from "@mui/icons-material/Comment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SliderMenuLink from "../SliderMenuLink";

const LinksSection = ({
  onClose,
  pathname,
}: {
  onClose: () => void;
  pathname: string;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const desktopLinks = (
    <Fragment>
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Обратная связь"}
        href={routerLinks.contactUs}
        icon={<ForumOutlinedIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"О проекте"}
        href={routerLinks.aboutUs}
        icon={<HomeIcon fontSize={"small"} color={"secondary"} />}
      />
    </Fragment>
  );

  return isMobile ? (
    <Fragment>
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Поиск"}
        href={routerLinks.search}
        icon={<TravelExploreIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Написать заметку"}
        href={routerLinks.createReview}
        icon={<CommentIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={"Создать место"}
        href={routerLinks.createPlace}
        icon={<AddBoxIcon fontSize={"small"} color={"secondary"} />}
      />
      {desktopLinks}
    </Fragment>
  ) : (
    desktopLinks
  );
};

export default LinksSection;
