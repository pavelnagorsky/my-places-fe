import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form-mui";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import fileService from "@/services/file-service/file.service";
import { useState } from "react";
import { useTranslation } from "next-i18next";

interface ISingleImageUploaderProps {
  notRequired?: boolean;
  fieldName: string;
  placeholder: string;
  onDelete: (fieldName: string) => void;
}

const SingleImageUploader = ({
  fieldName,
  placeholder,
  onDelete,
  notRequired,
}: ISingleImageUploaderProps) => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);

  return (
    <Controller
      rules={{
        required: !notRequired,
      }}
      render={({ field, fieldState }) => (
        <Box overflow="hidden">
          <Stack
            overflow="hidden"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            component="label"
            sx={({ transitions, palette }) => ({
              cursor: "pointer",
              boxShadow: "none",
              color: "secondary.dark",
              border: `1px solid ${
                fieldState.invalid ? palette.warning.main : palette.primary.main
              }`,
              borderRadius: "10px",
              height: "56px",
              "&:hover": { backgroundColor: palette.action.hover },
              transition: transitions.create(["background-color"]),
            })}
          >
            <Typography
              variant="body1"
              sx={{
                marginInlineStart: "1em",
                flexGrow: "99",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "20px",
                wordBreak: "break-word",
              }}
            >
              {field.value?.url ?? placeholder}
            </Typography>
            <Box
              mt={"0.4em"}
              sx={{ marginInlineEnd: "1em", marginInlineStart: "0.5em" }}
            >
              {loading ? <CircularProgress size={25} /> : <AttachFileIcon />}
            </Box>
            <input
              ref={field.ref}
              // onBlur={field.onBlur}
              // hidden
              style={{
                height: "0px",
                width: "0px",
              }}
              accept="file/*"
              type="file"
              onChange={(event) => {
                if (!event.target?.files || event.target?.files?.length === 0)
                  return;
                setLoading(true);
                fileService
                  .uploadImage(event.target.files[0])
                  .then((res) => {
                    field.onChange(res.data);
                    event.target.value = null as any;
                    setLoading(false);
                  })
                  .catch((e) => {
                    event.target.value = null as any;
                    setLoading(false);
                  });
              }}
            />
          </Stack>
          {field.value ? (
            <Box
              mt="1em"
              position="relative"
              sx={{
                maxWidth: "200px",
                maxHeight: "200px",
                minHeight: "40px",
                zIndex: 2,
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  right: 0,
                  color: "error.main",
                }}
                onClick={() => {
                  // const idForDelete = field.value?.id as number | null;
                  onDelete(fieldName);
                  // if (!idForDelete) return;
                  // fileService
                  //   .deleteImage(idForDelete)
                  //   .then(() => {})
                  //   .catch(() => {});
                }}
              >
                <CancelTwoToneIcon />
              </IconButton>
              <Box
                component="img"
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "200px",
                }}
                src={field.value?.url}
                alt="Изображение"
              />
            </Box>
          ) : null}
          {fieldState.invalid ? (
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                px: "1em",
                color: "error.main",
              }}
            >
              {t("errors.required")}
            </Typography>
          ) : null}
        </Box>
      )}
      name={fieldName}
    />
  );
};

export default SingleImageUploader;
