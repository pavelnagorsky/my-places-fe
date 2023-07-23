import { Box } from "@mui/material";

function PrimaryDivider({ reverse }: { reverse?: boolean }) {
  return (
    <Box
      sx={{
        background: reverse
          ? "linear-gradient(90deg, #E26D00 0%, #FFB800 100%)"
          : "linear-gradient(90deg, #FFB800 0%, #FF7A00 100%)",
      }}
      height={"4px"}
      width={"100%"}
    />
  );
}

export default PrimaryDivider;
