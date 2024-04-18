import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { memo, useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form-mui";
import { Box, styled, SxProps, Typography } from "@mui/material";
import textEditorConfig from "@/components/forms/text-editor/text-editor.config";
import { useTranslation } from "next-i18next";

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
}: {
  fieldName: string;
  readonly?: boolean;
  placeholder?: string;
  sx?: SxProps;
}) => {
  const { t, i18n } = useTranslation("common");
  const { setValue } = useFormContext();

  const translationsSx: SxProps = useMemo(
    () => ({
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
    }),
    [i18n.language]
  );

  return (
    <Box sx={sx}>
      <Controller
        name={fieldName}
        render={({ field }) => (
          <StyledEditor sx={{ ...translationsSx }}>
            <ReactQuill
              readOnly={readonly}
              theme="snow"
              value={field.value}
              onChange={(val: string, delta: any, source: any, editor: any) => {
                field.onChange(val);
                const contentLength = editor.getLength();
                setValue("_textEditorContentLength", contentLength - 1);
              }}
              className="editor-input"
              modules={textEditorConfig.modules}
              formats={textEditorConfig.formats}
              placeholder={placeholder}
            />
          </StyledEditor>
        )}
      />
      <Controller
        rules={{
          min: 1,
          max: 6000,
          required: true,
        }}
        render={({ field }) => {
          return (
            <Typography variant={"body2"} mt={"0.5em"} sx={{ float: "right" }}>
              {field.value || 0} / 6000
            </Typography>
          );
        }}
        name={"_textEditorContentLength"}
      />
    </Box>
  );
};

export default memo(TextEditor);
