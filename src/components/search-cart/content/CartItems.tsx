import CartItem from "@/components/search-cart/content/CartItem";
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeCartItem,
  selectCartPlaceIds,
  selectItems,
  selectLoading,
  sortItems,
} from "@/store/search-cart-slice/search-cart.slice";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import CartStepper from "@/components/search-cart/content/CartStepper";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import SortableList, { SortableItem } from "react-easy-sort";

import { getCartItemsThunk } from "@/store/search-cart-slice/thunks/thunks";

const CartItems = () => {
  const { i18n } = useTranslation();
  const items = useAppSelector(selectItems);
  const ids = useAppSelector(selectCartPlaceIds);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(getCartItemsThunk({ language: i18n.language }));
  }, [i18n.language, dispatch]);

  const onRemove = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    dispatch(sortItems({ oldIndex, newIndex }));
  };

  return (
    <Stack
      direction={"row"}
      gap={{ xs: "1em", md: "2em" }}
      height={"100%"}
      px={{ xs: "1em", md: "2em" }}
      pb={"1em"}
    >
      <CartStepper />
      <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragged">
        <Stack gap={"1em"} width={"100%"}>
          {items.map((item) => (
            <SortableItem key={item.id}>
              <Stack
                sx={{
                  "&.dragged": {
                    zIndex: 9999,
                  },
                }}
              >
                <CartItem place={item} onRemove={onRemove} />
              </Stack>
            </SortableItem>
          ))}
          {loading &&
            ids.map((id) => (
              <BoxPlaceholder sx={{ height: "200px" }} key={id} />
            ))}
        </Stack>
      </SortableList>
    </Stack>
  );
};

export default CartItems;
