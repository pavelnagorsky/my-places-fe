import { Backdrop, CircularProgress, SxProps } from "@mui/material";

const BackdropLoader = ({
  loading,
  sx,
}: {
  loading: boolean;
  sx?: SxProps;
}) => {
  return (
    <Backdrop
      open={loading}
      sx={{
        position: "absolute",
        zIndex: 2,
        backgroundColor: "white",
        ...sx,
      }}
    >
      <CircularProgress
        sx={{ position: "absolute", top: "45%" }}
        color="primary"
        size={50}
      />
    </Backdrop>
  );
};

export default BackdropLoader;
