import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import usePopover from "@/hooks/usePopover";

interface IUseMyReviewMenuProps {
  reviewId: number;
  onDelete: (reviewId: number) => void;
}

const useMyReviewMenu = ({ reviewId, onDelete }: IUseMyReviewMenuProps) => {
  const router = useRouter();
  const popover = usePopover("review-menu");

  const handleEdit = () => {
    popover.handleClose();
    router.push(routerLinks.personalAreaEditReview(reviewId));
  };

  const handleDelete = () => {
    popover.handleClose();
    onDelete(reviewId);
  };

  return {
    popover,
    handleEdit,
    handleDelete,
  };
};

export default useMyReviewMenu;
