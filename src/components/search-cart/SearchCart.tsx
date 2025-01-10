import SearchCartLayout from "@/components/search-cart/layout/SearchCartLayout";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectIsOpen,
  selectItems,
  setCartOpen,
} from "@/store/search-cart-slice/search-cart.slice";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { memo } from "react";
import CartHeader from "@/components/search-cart/layout/CartHeader";
import { StyledButton } from "@/components/UI/button/StyledButton";
import CartFooter from "@/components/search-cart/layout/CartFooter";
import CartItem from "@/components/search-cart/content/CartItem";
import CartItems from "@/components/search-cart/content/CartItems";

const SearchCart = () => {
  return (
    <SearchCartLayout>
      <CartHeader />
      <CartItems />
      <CartFooter />
    </SearchCartLayout>
  );
};

export default memo(SearchCart);
