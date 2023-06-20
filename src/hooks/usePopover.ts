import { MouseEvent, useState } from "react";

function usePopover(idText: string) {
  const [anchor, setAnchor] = useState<Element | null>(null);

  const open = Boolean(anchor);
  const id = open ? idText : undefined;

  const handleOpen = (e: MouseEvent<Element>) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return {
    open,
    anchor,
    id,
    handleClose,
    handleOpen,
  };
}

export default usePopover;
