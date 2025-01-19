import SearchCartLayout from "@/components/search-cart/layout/SearchCartLayout";
import { memo } from "react";
import CartHeader from "@/components/search-cart/layout/CartHeader";
import CartFooter from "@/components/search-cart/layout/CartFooter";
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
