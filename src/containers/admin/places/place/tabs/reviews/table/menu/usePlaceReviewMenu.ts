import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import usePopover from "@/hooks/usePopover";

interface IUsePlaceReviewMenuProps {
  reviewId: number;
  onDelete: (reviewId: number) => void;
}

const usePlaceReviewMenu = ({
  reviewId,
  onDelete,
}: IUsePlaceReviewMenuProps) => {
  const router = useRouter();
  const popover = usePopover("review-menu");

  const handleEdit = () => {
    popover.handleClose();
    router.push(routerLinks.administrationEditReview(reviewId));
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

export default usePlaceReviewMenu;
