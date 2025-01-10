import SearchCart from "@/components/search-cart/SearchCart";
import { Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { setCartOpen } from "@/store/search-cart-slice/search-cart.slice";
import { useEffect } from "react";
import { restoreCartFromLocalStorageThunk } from "@/store/search-cart-slice/thunks/thunks";
import { useAppDispatch } from "@/store/hooks";

const SearchCartWidget = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setCartOpen(true));
  };

  useEffect(() => {
    dispatch(restoreCartFromLocalStorageThunk());
  }, []);

  return (
    <>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 102,
          right: { xs: 18, md: 32, lg: 64 },
          zIndex: 100,
        }}
      >
        <Fab
          onClick={onClick}
          // sx={{
          //   boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.50)",
          // }}
          size={"small"}
          color="primary"
          aria-label="Cart"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
      <SearchCart />
    </>
  );
};

export default SearchCartWidget;
