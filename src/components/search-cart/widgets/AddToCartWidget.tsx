import { Box, Fab, SxProps, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { togglePlaceIdInCartThunk } from "@/store/search-cart-slice/thunks/thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { selectCartPlaceIds } from "@/store/search-cart-slice/search-cart.slice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

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
  const sendAnalytics = useAnalytics();

  const onClickCart = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: `${isAdded ? "remove" : "add"} place in cart`,
      placeId,
    });
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
        bottom: { xs: 106, md: 112 },
        right: { xs: 18, md: 24, lg: 56 },
        zIndex: 100,
        ...sx,
      }}
    >
      <Fab
        size={"medium"}
        onClick={onClickCart}
        sx={{
          boxShadow: "none",
          bgcolor: primaryBackground,
          color: "primary.main",
        }}
        aria-label="Index cart"
      >
        {isAdded ? (
          <RemoveIcon fontSize={"medium"} />
        ) : (
          <AddIcon fontSize={"medium"} />
        )}
      </Fab>
    </Box>
  );
};

export default memo(AddRoCartWidget);
