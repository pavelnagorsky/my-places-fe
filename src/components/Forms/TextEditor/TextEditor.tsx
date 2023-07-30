import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form-mui";
import { styled } from "@mui/material";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

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
  },
  "& .ql-container.ql-snow": {
    fontSize: "16px",
    fontFamily: "inherit",
    minHeight: "400px",
    borderRadius: "0 0 15px 15px",
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    borderTop: "none",
  },
}));

const TextEditor = ({ fieldName }: { fieldName: string }) => {
  const { setValue, watch } = useFormContext();
  const value = watch(fieldName);
  const onChange = (val: string) => {
    setValue(fieldName, val);
  };

  console.log(value);
  return (
    <Controller
      name={fieldName}
      render={() => (
        <StyledEditor>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            className="editor-input"
            modules={modules}
            placeholder="Enter text"
          />
        </StyledEditor>
      )}
    />
  );
};

export default memo(TextEditor);
