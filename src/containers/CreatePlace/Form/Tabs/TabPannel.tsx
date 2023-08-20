import { Box, Typography } from "@mui/material";
import { Fragment, ReactNode } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`place-tabpanel-${index}`}
      aria-labelledby={`place-tab-${index}`}
    >
      {value === index && <Fragment>{children}</Fragment>}
    </div>
  );
};

export default TabPanel;
