import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";

interface IUseMyPlaceMenuProps {
  placeId: number;
  onDelete: (placeId: number) => void;
}

const useMyPlaceMenu = ({ placeId, onDelete }: IUseMyPlaceMenuProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    router.push(routerLinks.personalAreaEditPlace(placeId));
  };

  const handleDelete = () => {
    handleClose();
    onDelete(placeId);
  };

  return {
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleEdit,
    handleDelete,
  };
};

export default useMyPlaceMenu;
