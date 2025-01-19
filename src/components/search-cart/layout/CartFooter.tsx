import { Stack } from "@mui/material";
import { Button } from "@/components/UI/button/Button";
import { useAppDispatch } from "@/store/hooks";
import { cartToRouteBuilderThunk } from "@/store/search-cart-slice/thunks/thunks";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";

const CartFooter = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onCreateRoute = () => {
    dispatch(cartToRouteBuilderThunk()).then(() => {
      router.push(routerLinks.createRoute);
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
        fullWidth
        variant={"contained"}
        sx={{ py: "0.9em" }}
        onClick={onCreateRoute}
      >
        Создать маршрут
      </Button>
      <Button fullWidth sx={{ py: "0.8em", color: "primary.main" }}>
        Создать экскурсию
      </Button>
    </Stack>
  );
};

export default CartFooter;
