import { useRef, useState } from "react";

const useCreateMenu = () => {
  const [createMenuOpen, setCreateMenu] = useState(false);
  const createMenuAnchorRef = useRef<HTMLButtonElement>(null);
  const handleToggleCreateMenu = () => {
    setCreateMenu((prevOpen) => !prevOpen);
  };
  const handleCloseCreateMenu = (event: Event) => {
    if (
      createMenuAnchorRef.current &&
      createMenuAnchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setCreateMenu(false);
  };

  return {
    createMenuOpen,
    setCreateMenu,
    createMenuAnchorRef,
    handleCloseCreateMenu,
    handleToggleCreateMenu,
  };
};

export default useCreateMenu;
