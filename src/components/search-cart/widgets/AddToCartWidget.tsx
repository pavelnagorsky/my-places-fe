import { Box, Fab, SxProps, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { togglePlaceIdInCartThunk } from "@/store/search-cart-slice/thunks/thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { selectCartPlaceIds } from "@/store/search-cart-slice/search-cart.slice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "next-i18next";

const AddRoCartWidget = ({
  sx,
  placeId,
}: {
  sx?: SxProps;
  placeId: number;
}) => {
  const { t } = useTranslation("route-management");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const cartIds = useAppSelector(selectCartPlaceIds);
  const isAdded = cartIds.includes(placeId);

  const onClickCart = () => {
    dispatch(
      togglePlaceIdInCartThunk({
        placeId,
        addedMsg: t("cart.placeAdded"),
        removedMsg: t("cart.placeRemoved"),
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
