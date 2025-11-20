import { PropsWithChildren } from "react";
import { Stack } from "@mui/material";

const StepperIconCircle = ({ children }: PropsWithChildren) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"white"}
    bgcolor={"primary.main"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    {children}
  </Stack>
);

export default StepperIconCircle;
