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

interface ISearchCartWidgetProps {
  sx?: SxProps;
}

const SearchCartWidget = ({ sx }: ISearchCartWidgetProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const cartItemsLength = useAppSelector(selectCartPlaceIdsLength);
  const onClick = () => {
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
            right: { xs: 18, md: 22, lg: 54 },
            zIndex: 100,
            ...sx,
          }}
        >
          <Fab
            size={isMobile ? "medium" : "large"}
            onClick={onClick}
            sx={{
              boxShadow: "none",
            }}
            color="primary"
            aria-label="Search cart"
          >
            <Badge
              badgeContent={cartItemsLength}
              sx={{
                "& .MuiBadge-badge": {
                  border: { md: "3px solid white" },
                  borderRadius: "50%",
                  fontSize: { md: "16px" },
                  fontWeight: { md: 700 },
                  transform: "translate(60%, -60%)",
                  minHeight: { md: "2em" },
                  width: { md: "2em" },
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
                height={isMobile ? 32 : 40}
                width={isMobile ? 32 : 40}
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
