import { Fragment, ReactNode } from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      //display={value !== index ? "none" : "block"}
      id={`place-tabpanel-${index}`}
      aria-labelledby={`place-tab-${index}`}
    >
      <Fragment>{children}</Fragment>
    </Box>
  );
};

export default TabPanel;
