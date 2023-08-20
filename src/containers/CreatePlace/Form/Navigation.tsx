import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { memo, SyntheticEvent } from "react";

function a11yProps(index: number) {
  return {
    id: `place-tab-${index}`,
    "aria-controls": `place-tabpanel-${index}`,
    sx: {
      textTransform: "none",
      textAlign: "start",
      fontSize: { xs: "14px", md: "20px" },
      color: "secondary.main",
      fontWeight: 300,
      alignItems: "start",
    },
  };
}

interface INavigationProps {
  activeTab: number;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
}

const Navigation = ({ activeTab, handleChange }: INavigationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        aria-label="place form tabs"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        orientation={!isMobile ? "vertical" : "horizontal"}
        TabIndicatorProps={{
          sx: {
            left: 0,
          },
        }}
        sx={{
          ".MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
          },

          flexDirection: "row",
          justifyContent: "flex-start",
          borderColor: "rgba(0, 0, 0, 0.12) !important",
          borderBottom: { xs: 1, md: "none" },
          borderLeft: { md: 1 },
        }}
      >
        <Tab label="Описание" {...a11yProps(0)} />
        <Tab label="Категории" {...a11yProps(1)} />
        <Tab label="Фотографии" {...a11yProps(2)} />
        <Tab label="Адрес" {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

export default memo(Navigation);
