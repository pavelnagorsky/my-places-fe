import { useState, MouseEvent } from "react";
import { useRouter } from "next/router";
import { routerLinks } from "@/staticData/routerLinks";

interface IUseMyReviewMenuProps {
  reviewId: number;
  onDelete: (reviewId: number) => void;
}

const useMyReviewMenu = ({ reviewId, onDelete }: IUseMyReviewMenuProps) => {
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
    router.push(routerLinks.personalAreaEditReview(reviewId));
  };

  const handleDelete = () => {
    handleClose();
    onDelete(reviewId);
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

export default useMyReviewMenu;
