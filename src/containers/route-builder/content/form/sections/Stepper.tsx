import { useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/route-builder-slice/route-builder.slice";
import { Box, Stack } from "@mui/material";
import { Fragment } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";

const PrimaryCircle = () => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"white"}
    bgcolor={"primary.main"}
    fontWeight={"700"}
    fontSize={"30px"}
    pt={"10px"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    *
  </Stack>
);

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

const Stepper = () => {
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} py={{ xs: "80px" }}>
      <PrimaryCircle />
      {items.length > 0 && <DashedLine />}
      {items.map((item, i) => (
        <Fragment key={item.id}>
          <Circle index={i} />
          {i !== items.length - 1 && <DashedLine />}
        </Fragment>
      ))}
    </Stack>
  );
};

export default Stepper;
