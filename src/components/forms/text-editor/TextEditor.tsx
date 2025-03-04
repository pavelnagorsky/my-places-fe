import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Controller, FieldError, useFormContext } from "react-hook-form-mui";
import {
  Box,
  FormHelperText,
  Stack,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import textEditorConfig from "@/components/forms/text-editor/text-editor.config";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

const StyledEditor = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "15px",
  "& .ql-toolbar.ql-snow": {
    padding: "0.8em",
    borderRadius: "15px 15px 0 0",
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    borderBottomColor: theme.palette.primary.light,
    borderBottomWidth: "1px",
    fontFamily: "inherit",
    "& .ql-picker.ql-size": {
      minWidth: "127px",
    },
  },
  "& .ql-container.ql-snow": {
    fontSize: "16px",
    fontFamily: "inherit",
    minHeight: "390px",
    borderRadius: "0 0 15px 15px",
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    borderTop: "none",
  },
}));

const TextEditor = ({
  fieldName,
  readonly,
  placeholder,
  sx,
  maxSymbols,
  required,
}: {
  fieldName: string;
  readonly?: boolean;
  placeholder?: string;
  sx?: SxProps;
  maxSymbols?: number;
  required?: boolean;
}) => {
  const { t } = useTranslation("common");
  const textLengthRef = useRef<number>(0);
  const { setValue } = useFormContext();

  const translationsSx: SxProps = {
    '& .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before':
      {
        content: `"${t("textEditor.fontSizes.large")}"`,
      },
    "& .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before":
      {
        content: `"${t("textEditor.fontSizes.normal")}"`,
      },
    '& .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before':
      {
        content: `"${t("textEditor.fontSizes.small")}"`,
      },
  };

  return (
    <Box sx={sx}>
      <Controller
        name={fieldName}
        rules={{
          validate: (value) => {
            if (!maxSymbols) return true;
            const contentLength = textLengthRef.current;
            if (required && contentLength === 0) {
              return t("errors.required");
            }
            return contentLength <= maxSymbols
              ? true
              : t("errors.maxLength", { value: maxSymbols });
          },
        }}
        render={({ field, fieldState }) => (
          <>
            <StyledEditor sx={{ ...translationsSx }}>
              <ReactQuill
                readOnly={readonly}
                theme="snow"
                value={field.value}
                onChange={(
                  val: string,
                  delta: any,
                  source: "api" | "user",
                  editor: any
                ) => {
                  const contentLength = editor.getLength();
                  textLengthRef.current = contentLength - 1;
                  if (source === "user") {
                    field.onChange(val);
                  } else {
                    setValue(fieldName, val, { shouldDirty: false });
                  }
                }}
                className="editor-input"
                modules={textEditorConfig.modules}
                formats={textEditorConfig.formats}
                placeholder={placeholder}
              />
            </StyledEditor>
            <Stack
              mt={"0.5em"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {!!fieldState.error ? (
                <FormHelperText
                  sx={{ color: "error.main", fontSize: "14px", mt: 0 }}
                >
                  {fieldState.error?.message}
                </FormHelperText>
              ) : (
                <div />
              )}
              {maxSymbols && (
                <Typography variant={"body2"}>
                  {textLengthRef?.current ?? 0} / {maxSymbols}
                </Typography>
              )}
            </Stack>
          </>
        )}
      />
    </Box>
  );
};

export default TextEditor;
