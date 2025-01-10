import { useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/search-cart-slice/search-cart.slice";
import { Box, Stack, Step, StepLabel } from "@mui/material";
import { Fragment } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";

const Circle = ({ index }: { index: number }) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"primary.main"}
    bgcolor={primaryBackground}
    fontWeight={"700"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    {index + 1}
  </Stack>
);

const DashedLine = () => (
  <Box
    sx={{
      width: 2,
      height: { xs: "190px", sm: "170px" },
      borderRight: "1.5px dashed #D4D4D4",
      my: "0.2em",
    }}
  />
);

const CartStepper = () => {
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} py={{ xs: "80px" }}>
      {items.map((item, i) => (
        <Fragment key={item.id}>
          <Circle index={i} />
          {i !== items.length - 1 && <DashedLine />}
        </Fragment>
      ))}
    </Stack>
  );
};

export default CartStepper;
