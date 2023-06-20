import {PropsWithChildren} from "react";
import {Box, SxProps} from "@mui/material";

interface ISmallContainerProps {
    sx?: SxProps
}

// Small container with padding
export function Wrapper({ children, sx }: PropsWithChildren & ISmallContainerProps) {
    return <Box sx={{
        px: {xs: "1.5em", md: "3em", lg: '7.5em'},
        ...sx
    }}>
        { children }
    </Box>
}