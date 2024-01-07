import { PropsWithChildren } from "react";
import { Container, SxProps } from "@mui/material";

export interface IDefaultContainerProps {
  bgColor?: string;
  sx?: SxProps;
}

export function DefaultContainer({
  children,
  bgColor,
  sx,
}: PropsWithChildren & IDefaultContainerProps) {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        backgroundColor: bgColor ? bgColor : "white",
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}
