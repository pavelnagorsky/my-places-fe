import { Box } from "@mui/material";
import { CSSProperties, PropsWithChildren } from "react";

interface IMediaProps extends PropsWithChildren {
  xs?: CSSProperties["display"];
  sm?: CSSProperties["display"];
  md?: CSSProperties["display"];
  lg?: CSSProperties["display"];
  xl?: CSSProperties["display"];
}

const Media = ({ xs, sm, md, lg, xl, children }: IMediaProps) => {
  return (
    <Box
      sx={{
        display: {
          xs: xs,
          sm: sm,
          md: md,
          lg: lg,
          xl: xl,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Media;
