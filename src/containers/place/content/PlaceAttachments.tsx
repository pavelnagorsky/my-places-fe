import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DownloadIcon from "@mui/icons-material/Download";
import { useTranslation } from "next-i18next";
import { IFileUploadResponse } from "@/services/place-files-service/interfaces";

const PlaceAttachments = ({ files }: { files: IFileUploadResponse[] }) => {
  const { t } = useTranslation("place");

  if (!files.length) return null;
  return (
    <>
      <Typography
        variant={"h2"}
        component={"h2"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        {t("attachments")}
      </Typography>
      <Grid container spacing={"2em"} mb={"2em"}>
        {files.map((file) => (
          <Grid size={{ xs: 12, sm: 6, md: 6 }} key={file.id}>
            <Stack
              direction={"row"}
              gap={"1em"}
              alignItems={"center"}
              component={"a"}
              href={file.url}
              download
              rel={"noreferrer"}
              target={"_blank"}
              sx={{ textDecoration: "none" }}
            >
              <Stack
                sx={{
                  cursor: "pointer",
                  borderRadius: "7px",
                  backgroundColor: "RGBA(213, 213, 213, 0.26)",
                  minWidth: "50px",
                  maxWidth: "50px",
                  height: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DownloadIcon color={"disabled"} />
              </Stack>
              <Stack gap={0.5}>
                <Typography
                  className={"filename"}
                  //fontWeight={700}
                  color={"secondary.main"}
                  sx={{
                    wordBreak: "break-word",
                    color: "initial",
                  }}
                >
                  {file.filename}
                </Typography>
                <Typography
                  className={"link"}
                  color={"primary.main"}
                  sx={{ textDecoration: "none" }}
                  fontWeight={500}
                >
                  {t("common:buttons.download")}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlaceAttachments;
