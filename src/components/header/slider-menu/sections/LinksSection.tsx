import { useMediaQuery, useTheme } from "@mui/material";
import { Fragment } from "react";
import { routerLinks } from "@/routing/routerLinks";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CommentIcon from "@mui/icons-material/Comment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RouteIcon from "@mui/icons-material/Route";
import SliderMenuLink from "./SliderMenuLink";
import { useTranslation } from "next-i18next";
import MapIcon from "@mui/icons-material/Map";
import MessagesIcon from "@/components/UI/custom-icons/MessagesIcon";
import InfoIcon from "@/components/UI/custom-icons/InfoIcon";

const desktopLinksConfig = [
  {
    i18nKey: "links.contactUs",
    icon: MessagesIcon,
    href: routerLinks.contactUs,
  },
  { i18nKey: "links.about", icon: InfoIcon, href: routerLinks.aboutUs },
];

const mobileLinksConfig = [
  {
    i18nKey: "links.search",
    icon: TravelExploreIcon,
    href: routerLinks.places,
  },
  { i18nKey: "links.excursions", icon: MapIcon, href: routerLinks.excursions },
  {
    i18nKey: "links.createReviewMobile",
    icon: CommentIcon,
    href: routerLinks.createReview,
  },
  {
    i18nKey: "links.createPlaceMobile",
    icon: AddBoxIcon,
    href: routerLinks.createPlace,
  },
  {
    i18nKey: "links.createRouteMobile",
    icon: RouteIcon,
    href: routerLinks.createRoute,
  },
  {
    i18nKey: "links.createExcursionMobile",
    icon: RouteIcon,
    href: routerLinks.createExcursion,
  },
];

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
      {desktopLinksConfig.map((item) => (
        <SliderMenuLink
          key={item.href}
          pathname={pathname}
          onClick={onClose}
          text={t(item.i18nKey)}
          href={item.href}
          icon={<item.icon color={"secondary"} />}
        />
      ))}
    </Fragment>
  );

  return isMobile ? (
    <Fragment>
      {mobileLinksConfig.map((item) => (
        <SliderMenuLink
          key={item.href}
          pathname={pathname}
          onClick={onClose}
          text={t(item.i18nKey)}
          href={item.href}
          icon={<item.icon color={"secondary"} />}
        />
      ))}
      {desktopLinks}
    </Fragment>
  ) : (
    desktopLinks
  );
};

export default LinksSection;
