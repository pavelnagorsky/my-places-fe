import { Wrapper } from "@/hoc/wrappers/Wrapper";
import {
  DefaultContainer,
  IDefaultContainerProps,
} from "@/hoc/wrappers/DefaultContainer";
import { PropsWithChildren } from "react";
import { SxProps } from "@mui/material";

interface IWrappedContainerProps
  extends PropsWithChildren,
    IDefaultContainerProps {
  wrapperSx?: SxProps;
}

function WrappedContainer({
  sx,
  bgColor,
  children,
  wrapperSx,
}: IWrappedContainerProps) {
  return (
    <DefaultContainer sx={sx} bgColor={bgColor}>
      <Wrapper sx={wrapperSx}>{children}</Wrapper>
    </DefaultContainer>
  );
}

export default WrappedContainer;
