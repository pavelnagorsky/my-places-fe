import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectCartPlaceIds } from "@/store/search-cart-slice/search-cart.slice";
import {
  IconButton,
  Stack,
  SxProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { primaryBackground } from "@/styles/theme/lightTheme";

import { togglePlaceIdInCartThunk } from "@/store/search-cart-slice/thunks/thunks";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import { useTranslation } from "next-i18next";

interface IAddToCartProps {
  placeId: number;
  mapCardMode?: boolean;
}

const AddToCart = ({ placeId, mapCardMode }: IAddToCartProps) => {
  const theme = useTheme();
  const { t } = useTranslation("search");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const cartIds = useAppSelector(selectCartPlaceIds);
  const isAdded = cartIds.includes(placeId);
  const sendAnalytics = useAnalytics();

  const onClickCart = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: `${isAdded ? "remove" : "add"} place in cart`,
      entityId: `${placeId}`,
    });
    dispatch(
      togglePlaceIdInCartThunk({
        placeId,
        addedMsg: t("addedToCartMsg"),
        removedMsg: t("removedFromCartMsg"),
      })
    );
  };

  const actionButtonSx: SxProps = {
    bgcolor: isAdded ? primaryBackground : "primary.main",
    "&:hover": { bgcolor: isAdded ? primaryBackground : "primary.main" },
    color: isAdded ? "primary.main" : "white",
  };

  return mapCardMode ? (
    <IconButton
      onClick={onClickCart}
      size={isMobile ? "medium" : "small"}
      sx={{
        ...actionButtonSx,
        position: "absolute",
        bottom: { xs: "3em", md: "unset" },
        top: { md: 0 },
        right: { xs: 0, md: "unset" },
        zIndex: 1,
        m: { xs: "0 0.3em 0 0", md: "0.5em" },
      }}
    >
      {isAdded ? (
        <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
      ) : (
        <AddIcon fontSize={isMobile ? "small" : "medium"} />
      )}
    </IconButton>
  ) : (
    <Stack
      width={"100%"}
      p={"0.5em"}
      zIndex={1}
      direction="row"
      gap={"1em"}
      position={"absolute"}
      top={0}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {isAdded ? (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          width={"40px"}
          height={"40px"}
          borderRadius={"50%"}
          color={"white"}
          bgcolor={"primary.main"}
        >
          <CheckIcon />
        </Stack>
      ) : (
        <div />
      )}
      <IconButton
        size={isMobile ? "large" : "medium"}
        onClick={onClickCart}
        sx={actionButtonSx}
      >
        {isAdded ? <RemoveIcon /> : <AddIcon />}
      </IconButton>
    </Stack>
  );
};

export default AddToCart;
