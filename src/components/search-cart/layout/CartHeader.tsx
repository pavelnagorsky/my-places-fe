import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  clearCart,
  selectCartPlaceIdsLength,
  setCartOpen,
} from "@/store/search-cart-slice/search-cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTranslation } from "next-i18next";
import deleteIcon from "../../../../public/images/icons/basket.png";

const CartHeader = () => {
  const { t } = useTranslation("route-management");
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartPlaceIdsLength);
  const onClose = () => {
    dispatch(setCartOpen(false));
  };

  const onClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"0.5em"}
      position={"sticky"}
      top={0}
      zIndex={2}
      py={{ xs: "1em", md: "2em" }}
      pl={{ xs: "1em", md: "6em" }}
      pr={{ xs: "1em", md: "2em" }}
      bgcolor={"white"}
    >
      <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
        <Typography fontSize={{ xs: "20px", md: "26px" }} fontWeight={500}>
          {t("cart.totalSelected", { totalItems: totalItems })}
        </Typography>
        <IconButton size={"small"} color={"primary"} onClick={onClearCart}>
          <Box
            component={"img"}
            src={deleteIcon.src}
            alt={"Clear cart"}
            sx={{
              height: "25px",
              width: "25px",
            }}
          />
        </IconButton>
      </Stack>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};

export default CartHeader;
