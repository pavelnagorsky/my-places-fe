import CartItem from "@/components/search-cart/content/CartItem";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
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
import { AnimatePresence, motion } from "framer-motion";

const CartItems = () => {
  const { i18n } = useTranslation();
  const items = useAppSelector(selectItems);
  const ids = useAppSelector(selectCartPlaceIds);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      sx={{ "& .drag-container": { width: "100%" } }}
    >
      {!isMobile && <CartStepper />}
      <SortableList
        onSortEnd={onSortEnd}
        draggedItemClassName="dragged"
        className={"drag-container"}
      >
        <Stack gap={"1em"} width={"100%"}>
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5, x: -200 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 200,
                  zIndex: 1,
                  scale: 1.2,
                }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <SortableItem>
                  <Stack
                    sx={{
                      "&.dragged": {
                        zIndex: 9999,
                      },
                    }}
                  >
                    <CartItem place={item} index={index} onRemove={onRemove} />
                  </Stack>
                </SortableItem>
              </motion.div>
            ))}
          </AnimatePresence>
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
