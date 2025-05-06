import { Box, styled } from "@mui/material";

const StyledTextEditorContainer = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  overflow: "hidden",
  wordBreak: "break-word",
  lineHeight: "140%",
  p: "0.5em",
  height: "100%",
  img: {
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "100vh",
  },
  "h1, h2, h3, h4, h5, h6, .ql-size-large": {
    fontSize: "1.25rem",
  },
  ".ql-size-small": {
    fontSize: "0.75rem",
  },
  "& ul, ol": { paddingInlineStart: "1.2em", margin: "0.5em 0" },
  "& blockquote": {
    borderLeft: "4px solid #ccc",
    marginBottom: "5px",
    marginTop: "5px",
    paddingInlineStart: "16px",
  },
  "& .ql-indent-1": {
    paddingInlineStart: "1em",
  },
  "& .ql-indent-2": {
    paddingInlineStart: "2em",
  },
  "& .ql-indent-3": {
    paddingInlineStart: "3em",
  },
  "& .ql-indent-4": {
    paddingInlineStart: "4em",
  },
  "& .ql-indent-5": {
    paddingInlineStart: "5em",
  },
  "& .ql-indent-6": {
    paddingInlineStart: "6em",
  },
  "& .ql-indent-7": {
    paddingInlineStart: "7em",
  },
  "& .ql-indent-8": {
    paddingInlineStart: "8em",
  },
}));

export default StyledTextEditorContainer;
