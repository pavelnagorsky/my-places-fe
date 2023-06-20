import {Box, SxProps} from "@mui/material";

interface ICircleProps {
    gradient: string;
    height: string,
    width: string,
    left: string,
    top: string,
    sx?: SxProps
}

export function Circle({gradient, height, left, top, width, sx}: ICircleProps) {
    return <Box
        height={height}
        width={width}
        top={top}
        left={left}
        position={"absolute"}
        borderRadius={"50%"}
        sx={{
            background: gradient,
            ...sx
        }}
    />
}