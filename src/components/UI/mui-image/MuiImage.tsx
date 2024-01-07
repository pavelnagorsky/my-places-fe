import { Box, BoxProps } from "@mui/material";
import Image, { ImageProps } from "next/image";

interface IMuiImageProps {
  boxProps?: BoxProps;
  imageProps: ImageProps;
}

export const MuiImage = (props: IMuiImageProps) => {
  return (
    <Box position={"relative"} {...props.boxProps}>
      <Image {...props.imageProps} />
    </Box>
  );
};
