import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import { routerLinks } from "@/staticData/routerLinks";
import placesService from "@/services/places-service/places.service";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";

interface IUseMyPlaceMenuProps {
  placeId: number;
  onDelete: (placeId: number) => void;
}

const useMyPlaceMenu = ({ placeId, onDelete }: IUseMyPlaceMenuProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
