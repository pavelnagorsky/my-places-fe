import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import usePopover from "@/hooks/usePopover";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";

interface IUseMyExcursionMenuProps {
  item: IExcursionListItem;
  onDelete: (id: number) => void;
}

const useMyExcursionMenu = ({ item, onDelete }: IUseMyExcursionMenuProps) => {
  const router = useRouter();
  const popover = usePopover("my-excursion-menu");

  const handleEdit = () => {
    popover.handleClose();
    router.push(routerLinks.personalAreaEditExcursion(item.id));
  };

  const handleDelete = () => {
    popover.handleClose();
    onDelete(item.id);
  };

  const prepareData = () => {
    const travelMode = item.travelMode ?? TravelModesEnum.DRIVING;
    const waypoints = item.places.map((place) => place.coordinates);

    // Extract start and end waypoints
    const startLatLng = waypoints[0];
    const endLatLng = waypoints[waypoints.length - 1];

    // Slice waypoints array to exclude the first and last elements
    const slicedWaypoints = waypoints.slice(1, waypoints.length - 1);

    return { waypoints: slicedWaypoints, startLatLng, endLatLng, travelMode };
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

  return {
    popover,
    handleEdit,
    handleDelete,
    handleOpenGoogleNavigator,
    handleOpenYandexNavigator,
  };
};

export default useMyExcursionMenu;
