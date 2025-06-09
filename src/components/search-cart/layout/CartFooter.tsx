import { Stack } from "@mui/material";
import { Button } from "@/components/UI/button/Button";
import { useAppDispatch } from "@/store/hooks";
import {
  cartToExcursionBuilderThunk,
  cartToRouteBuilderThunk,
} from "@/store/search-cart-slice/thunks/thunks";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";

const CartFooter = () => {
  const { t } = useTranslation("route-management");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sendAnalytics = useAnalytics();

  const onCreateRoute = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "create route from cart",
    });
    dispatch(cartToRouteBuilderThunk()).then(() => {
      router.push(routerLinks.createRoute);
    });
  };

  const onCreateExcursion = () => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: "create excursion from cart",
    });
    dispatch(cartToExcursionBuilderThunk()).then(() => {
      router.push(routerLinks.createExcursion);
    });
  };

  return (
    <Stack
      direction={{ sm: "row" }}
      mt={"auto"}
      alignItems={"center"}
      gap={"1em"}
      position={"sticky"}
      bottom={0}
      zIndex={1}
      py={{ xs: "1em", md: "2em" }}
      px={{ xs: "1em", md: "6em" }}
      bgcolor={"white"}
    >
      <Button
        variant={"contained"}
        sx={{ py: "0.9em" }}
        fullWidth
        onClick={onCreateRoute}
      >
        {t("cart.createRoute")}
      </Button>
      <Button
        fullWidth
        sx={{ py: "0.8em", color: "primary.main" }}
        onClick={onCreateExcursion}
      >
        {t("cart.createExcursion")}
      </Button>
    </Stack>
  );
};

export default CartFooter;
