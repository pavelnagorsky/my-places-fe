import Box from "@mui/material/Box";
import Image from "next/image";
import { IImage } from "@/services/file-service/image.interface";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { IFileUploadResponse } from "@/services/place-files-service/interfaces";
import { useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const FilePreview = ({
  file,
  onDelete,
  readonly,
}: {
  file: IFileUploadResponse;
  onDelete: () => void;
  readonly?: boolean;
}) => {
  const [imageError, setImageError] = useState(false);

  // Check if file is an image based on URL extension
  const isImage = file.url?.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i);

  // Check if file is a text-based document based on URL extension
  const isTextDocument = file.url?.match(/\.(pdf|doc|docx|txt|rtf|odt)$/i);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box
      position={"relative"}
      sx={{
        width: { xs: "150px", md: "170px" },
        height: { xs: "150px", md: "170px" },
        borderRadius: "15px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {!readonly && (
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
      )}

      {/* Image display */}
      {isImage && !imageError && (
        <Image
          src={file.url}
          alt={file.filename || `file ${file.id}`}
          priority
          sizes={"(max-width: 900px) 160px, 170px"}
          fill
          draggable={false}
          style={{
            objectFit: "cover",
            pointerEvents: "none",
          }}
          onError={handleImageError}
        />
      )}

      {/* Document icon display for text files or failed images */}
      {(isTextDocument || imageError || !isImage) && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            bgcolor: "grey.100",
            padding: 1,
          }}
        >
          <DescriptionIcon
            sx={{
              fontSize: 48,
              color: "grey.600",
              mb: 1,
            }}
          />
          {file.filename && (
            <Tooltip title={file.filename}>
              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  maxWidth: "100%",
                  color: "grey.700",
                }}
              >
                {file.filename}
              </Typography>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Filename overlay for images */}
      {isImage && !imageError && file.filename && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            padding: "4px 8px",
          }}
        >
          <Tooltip title={file.filename}>
            <Typography
              variant="caption"
              sx={{
                color: "white",
                textAlign: "center",
                wordBreak: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {file.filename}
            </Typography>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default FilePreview;
