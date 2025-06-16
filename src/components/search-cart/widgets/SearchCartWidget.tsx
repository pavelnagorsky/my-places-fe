import SearchCart from "@/components/search-cart/SearchCart";
import {
  Badge,
  Box,
  Fab,
  SxProps,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material";
import routingIcon from "/public/images/icons/routing.png";
import {
  selectCartPlaceIdsLength,
  setCartOpen,
} from "@/store/search-cart-slice/search-cart.slice";
import { useEffect } from "react";
import { restoreCartFromLocalStorageThunk } from "@/store/search-cart-slice/thunks/thunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { primaryBackground } from "@/styles/theme/lightTheme";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

interface ISearchCartWidgetProps {
  sx?: SxProps;
}

const SearchCartWidget = ({ sx }: ISearchCartWidgetProps) => {
  const dispatch = useAppDispatch();
  const cartItemsLength = useAppSelector(selectCartPlaceIdsLength);
  const sendAnalytics = useAnalytics();
  const onClick = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, { title: "open cart" });
    dispatch(setCartOpen(true));
  };

  useEffect(() => {
    dispatch(restoreCartFromLocalStorageThunk());
  }, []);

  return (
    <>
      <Zoom in={cartItemsLength > 0}>
        <Box
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 102,
            right: { xs: 14, md: 22, lg: 54 },
            zIndex: 100,
            ...sx,
          }}
        >
          <Fab
            size={"large"}
            onClick={onClick}
            sx={{
              boxShadow: "none",
            }}
            color="primary"
            aria-label="Index cart"
          >
            <Badge
              badgeContent={cartItemsLength}
              sx={{
                "& .MuiBadge-badge": {
                  border: "3px solid white",
                  borderRadius: "50%",
                  fontSize: "16px",
                  fontWeight: 700,
                  transform: "translate(60%, -60%)",
                  minHeight: "2em",
                  width: "2em",
                  color: "primary.main",
                  backgroundColor: primaryBackground,
                },
              }}
              color="primary"
            >
              <Image
                src={routingIcon}
                alt={"search cart"}
                priority
                height={40}
                width={40}
              />
            </Badge>
          </Fab>
        </Box>
      </Zoom>
      <SearchCart />
    </>
  );
};

export default SearchCartWidget;
