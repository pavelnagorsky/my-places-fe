import { Stack } from "@mui/material";
import { Button } from "@/components/UI/button/Button";

const CartFooter = () => {
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
      <Button fullWidth variant={"contained"} sx={{ py: "0.9em" }}>
        Создать маршрут
      </Button>
      <Button fullWidth sx={{ py: "0.8em", color: "primary.main" }}>
        Создать экскурсию
      </Button>
    </Stack>
  );
};

export default CartFooter;
