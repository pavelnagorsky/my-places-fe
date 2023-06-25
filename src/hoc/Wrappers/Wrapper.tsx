import { PropsWithChildren } from "react";
import { Box, SxProps } from "@mui/material";

interface IWrapperProps {
  sx?: SxProps;
}

// Small container with padding
export function Wrapper({ children, sx }: PropsWithChildren & IWrapperProps) {
  return (
    <Box
      sx={{
        px: { xs: "1.5em", md: "3em", lg: "7.5em" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
