import { useState, MouseEvent } from "react";

interface IUseMyPlaceMenuProps {
  placeId: number;
}

const useMyPlaceMenu = ({ placeId }: IUseMyPlaceMenuProps) => {
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
  };

  const handleDelete = () => {
    handleClose();
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
