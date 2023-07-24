import Box from "@mui/material/Box";
import Image from "next/image";
import { IImage } from "@/services/file-service/image.interface";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const ImagePreview = ({
  image,
  onDelete,
}: {
  image: IImage;
  onDelete: () => void;
}) => {
  return (
    <Box
      position={"relative"}
      sx={{
        width: { xs: "160px", md: "170px" },
        height: { xs: "160px", md: "170px" },
        borderRadius: "15px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        pointerEvents: "none",
      }}
    >
      <IconButton
        size={"small"}
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.25)",
          position: "absolute",
          right: "2px",
          top: "2px",
          pointerEvents: "initial",
          zIndex: 1,
        }}
        onClick={onDelete}
      >
        <ClearIcon fontSize={"small"} sx={{ color: "white" }} />
      </IconButton>
      <Image
        src={image.url}
        alt={`image ${image.id}`}
        priority
        sizes={"(max-width: 900px) 160px, 170px"}
        fill
        draggable={false}
        style={{
          borderRadius: "15px",
          objectFit: "cover",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default ImagePreview;
