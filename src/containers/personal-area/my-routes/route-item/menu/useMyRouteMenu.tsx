import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import usePopover from "@/hooks/usePopover";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import I18nLanguages from "@/shared/I18nLanguages";

interface IUseMyRouteMenuProps {
  route: IRoute;
  onDelete: (routeId: number) => void;
}

const useMyRouteMenu = ({ route, onDelete }: IUseMyRouteMenuProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation("personal-area");
  const dispatch = useAppDispatch();
  const popover = usePopover("my-route-menu");

  const handleEdit = () => {
    popover.handleClose();
    router.push(routerLinks.personalAreaEditRoute(route.id));
  };

  const handleDelete = () => {
    popover.handleClose();
    onDelete(route.id);
  };

  const prepareData = () => {
    const travelMode = route.travelMode ?? TravelModesEnum.DRIVING;
    const waypoints = route.places.map((place) => place.coordinates);
    const startLatLng = route.coordinatesStart;
    const endLatLng = route.coordinatesEnd;

    return { waypoints, startLatLng, endLatLng, travelMode };
  };

  const handleOpenGoogleNavigator = () => {
    popover.handleClose();
    const { waypoints, startLatLng, endLatLng, travelMode } = prepareData();
    if (!startLatLng || !endLatLng) return;

    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("|");

    const url = `https://www.google.com/maps/dir/?api=1&origin=${
      startLatLng.lat
    },${startLatLng.lng}&destination=${endLatLng.lat},${
      endLatLng.lng
    }&waypoints=${waypointsString}&travelmode=${travelMode.toLowerCase()}`;

    window.open(url, "_blank");
  };

  const handleOpenYandexNavigator = () => {
    popover.handleClose();
    const { waypoints, startLatLng, endLatLng, travelMode } = prepareData();
    if (!startLatLng || !endLatLng) return;

    const waypointsString = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join("~");

    const url = `https://yandex.ru/maps/?rtext=${startLatLng.lat},${
      startLatLng.lng
    }~${waypointsString}~${endLatLng.lat},${endLatLng.lng}&rtt=${
      travelMode === TravelModesEnum.DRIVING ? "auto" : "pd"
    }`;

    window.open(url, "_blank");
  };

  const getRouteLink = () => {
    const link = `${window.location.origin}${
      i18n.language === I18nLanguages.ru ? "" : `/${i18n.language}`
    }/routes/${route.id}`;
    return link;
  };

  const copyLink = async () => {
    popover.handleClose();
    const link = getRouteLink();
    try {
      await navigator.clipboard.writeText(link);
      dispatch(
        showAlertThunk({
          alertProps: {
            title: t("routes.feedback.copyLink"),
            variant: "standard",
            severity: "success",
          },
          snackbarProps: {},
        })
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return {
    popover,
    handleEdit,
    handleDelete,
    handleOpenGoogleNavigator,
    handleOpenYandexNavigator,
    copyLink,
  };
};

export default useMyRouteMenu;
