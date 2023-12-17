import { Skeleton, SxProps } from "@mui/material";

interface IBoxPlaceholderProps {
  sx?: SxProps;
}

export function BoxPlaceholder({ sx }: IBoxPlaceholderProps) {
  return (
    <Skeleton
      sx={{
        boxShadow: "0px 5px 20px rgba(32, 31, 61, 0.1)",
        borderRadius: "20px",
        height: { xs: "170px", md: "118px" },
        ...sx,
      }}
      variant="rectangular"
      width={"100%"}
    />
  );
}
