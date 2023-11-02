import { Box, styled } from "@mui/material";
const StyledReviewsContainer = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  overflow: "hidden",
  wordBreak: "break-word",
  p: "0.5em",
  height: "100%",
  "& ul, ol": { paddingInlineStart: "1em", margin: "0.5em 0" },
  "& blockquote": {
    borderLeft: "4px solid #ccc",
    marginBottom: "5px",
    marginTop: "5px",
    paddingInlineStart: "16px",
  },
}));

export default StyledReviewsContainer;
