import { CircularProgress, Stack, Typography } from "@mui/material";

const TableLoader = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"0.5em"}
      height={"5em"}
    >
      <CircularProgress size={30} />
      <Typography fontSize={"18px"} color={"secondary.main"} fontWeight={600}>
        Загрузка...
      </Typography>
    </Stack>
  );
};

export default TableLoader;
