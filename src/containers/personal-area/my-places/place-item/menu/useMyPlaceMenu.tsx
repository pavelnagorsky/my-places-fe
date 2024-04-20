import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import usePopover from "@/hooks/usePopover";

interface IUseMyPlaceMenuProps {
  placeId: number;
  onDelete: (placeId: number) => void;
}

const useMyPlaceMenu = ({ placeId, onDelete }: IUseMyPlaceMenuProps) => {
  const router = useRouter();
  const popover = usePopover("place-menu");

  const handleEdit = () => {
    popover.handleClose();
    router.push(routerLinks.personalAreaEditPlace(placeId));
  };

  const handleDelete = () => {
    popover.handleClose();
    onDelete(placeId);
  };

  return {
    popover,
    handleEdit,
    handleDelete,
  };
};

export default useMyPlaceMenu;
