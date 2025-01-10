import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import {
  selectIsOpen,
  setCartOpen,
} from "@/store/search-cart-slice/search-cart.slice";
import { Drawer, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

const SearchCartLayout = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const onClose = () => {
    dispatch(setCartOpen(false));
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor={"right"}
      PaperProps={{
        id: "root-layout",
        sx: {
          width: "100%",
          maxWidth: "886px",
          scrollbarWidth: "thin",
          overflowY: "auto",
        },
      }}
    >
      <Stack position={"relative"} flex={1}>
        {children}
      </Stack>
    </Drawer>
  );
};

export default SearchCartLayout;
