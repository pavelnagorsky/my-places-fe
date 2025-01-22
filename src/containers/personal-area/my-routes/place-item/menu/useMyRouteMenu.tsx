import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import usePopover from "@/hooks/usePopover";

interface IUseMyRouteMenuProps {
  routeId: number;
  onDelete: (routeId: number) => void;
}

const useMyRouteMenu = ({ routeId, onDelete }: IUseMyRouteMenuProps) => {
  const router = useRouter();
  const popover = usePopover("my-route-menu");

  const handleEdit = () => {
    popover.handleClose();
    router.push(routerLinks.personalAreaEditPlace(routeId));
  };

  const handleDelete = () => {
    popover.handleClose();
    onDelete(routeId);
  };

  return {
    popover,
    handleEdit,
    handleDelete,
  };
};

export default useMyRouteMenu;
