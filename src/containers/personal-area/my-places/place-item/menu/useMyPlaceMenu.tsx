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

  const handleAddReview = () => {
    popover.handleClose();
    router.push(routerLinks.createReview + `?placeId=${placeId}`);
  };

  const handleDelete = () => {
    popover.handleClose();
    onDelete(placeId);
  };

  return {
    popover,
    handleEdit,
    handleDelete,
    handleAddReview,
  };
};

export default useMyPlaceMenu;
