import { useMediaQuery, useTheme } from "@mui/material";
import { Fragment } from "react";
import { routerLinks } from "@/routing/routerLinks";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CommentIcon from "@mui/icons-material/Comment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SliderMenuLink from "../SliderMenuLink";
import { useTranslation } from "next-i18next";

const LinksSection = ({
  onClose,
  pathname,
}: {
  onClose: () => void;
  pathname: string;
}) => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const desktopLinks = (
    <Fragment>
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={t("links.contactUs")}
        href={routerLinks.contactUs}
        icon={<ForumOutlinedIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={t("links.about")}
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
        text={t("links.search")}
        href={routerLinks.search}
        icon={<TravelExploreIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={t("links.createReviewMobile")}
        href={routerLinks.createReview}
        icon={<CommentIcon fontSize={"small"} color={"secondary"} />}
      />
      <SliderMenuLink
        pathname={pathname}
        onClick={onClose}
        text={t("links.createPlaceMobile")}
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
