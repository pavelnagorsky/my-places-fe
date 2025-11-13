import { Box, SxProps, Typography } from "@mui/material";

const StepperDashedLine = ({ sx, time }: { sx?: SxProps; time?: string }) => (
  <Box
    sx={{
      width: 2,
      height: { xs: "190px", sm: "245px" },
      borderRight: "1.5px dashed #D4D4D4",
      my: "0.2em",
      position: "relative",
      ...sx,
    }}
  >
    {time && (
      <Typography
        color={"primary"}
        fontWeight={600}
        fontSize={"15px"}
        sx={{
          position: "absolute",
          minWidth: "100px",
          textAlign: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "0.5em",
        }}
      >
        {time}
      </Typography>
    )}
  </Box>
);

export default StepperDashedLine;
