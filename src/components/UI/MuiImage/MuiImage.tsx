import {Box, BoxProps} from "@mui/material";
import Image, {ImageProps} from "next/image";

export const MuiImage = (props: BoxProps & ImageProps) => {
    return <Box component={Image} {...props} />
}