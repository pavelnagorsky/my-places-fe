import SearchCart from "@/components/search-cart/SearchCart";
import {
  Badge,
  Box,
  Fab,
  IconButton,
  SxProps,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import routingIcon from "/public/images/icons/routing.png";
import { memo, useEffect } from "react";
import {
  restoreCartFromLocalStorageThunk,
  togglePlaceIdInCartThunk,
} from "@/store/search-cart-slice/thunks/thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { selectCartPlaceIds } from "@/store/search-cart-slice/search-cart.slice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const AddRoCartWidget = ({
  sx,
  placeId,
}: {
  sx?: SxProps;
  placeId: number;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const cartIds = useAppSelector(selectCartPlaceIds);
  const isAdded = cartIds.includes(placeId);

  const onClickCart = () => {
    dispatch(
      togglePlaceIdInCartThunk({
        placeId,
        addedMsg: "Место добавлено в конструктор маршрутов",
        removedMsg: "Место удалено из конструктора маршрутов",
      })
    );
  };

  return (
    <Box
      role="presentation"
      sx={{
        position: "fixed",
        bottom: { xs: 92, md: 112 },
        right: { xs: 18, md: 32, lg: 64 },
        zIndex: 100,
        ...sx,
      }}
    >
      <Fab
        size={"small"}
        onClick={onClickCart}
        sx={{
          boxShadow: "none",
          bgcolor: primaryBackground,
          color: "primary.main",
        }}
        aria-label="Search cart"
      >
        {isAdded ? (
          <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
        ) : (
          <AddIcon fontSize={isMobile ? "small" : "medium"} />
        )}
      </Fab>
    </Box>
  );
};

export default memo(AddRoCartWidget);
