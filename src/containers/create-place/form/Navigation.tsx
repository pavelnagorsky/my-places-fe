import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { memo, SyntheticEvent } from "react";
import { useTranslation } from "next-i18next";

function a11yProps(index: number) {
  return {
    id: `place-tab-${index}`,
    "aria-controls": `place-tabpanel-${index}`,
    sx: {
      textTransform: "none",
      textAlign: "start",
      fontSize: { xs: "14px", md: "20px" },
      color: "secondary.main",
      fontWeight: { xs: 500, md: 300 },
      alignItems: "start",
    },
  };
}

interface INavigationProps {
  activeTab: number;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
  alwaysHorizontal?: boolean;
}

const Navigation = ({
  activeTab,
  handleChange,
  alwaysHorizontal,
}: INavigationProps) => {
  const { t } = useTranslation("place-management");
  const theme = useTheme();
  const _isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = _isMobile || !!alwaysHorizontal;
  return (
    <Box sx={{ width: "100%", mt: { md: "-0.5em" } }}>
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
          borderBottom: { xs: 1, md: alwaysHorizontal ? 1 : "none" },
          borderLeft: { md: alwaysHorizontal ? undefined : 1 },
        }}
      >
        <Tab label={t("tabs.1.title")} {...a11yProps(0)} />
        <Tab label={t("tabs.2.title")} {...a11yProps(1)} />
        <Tab label={t("tabs.3.title")} {...a11yProps(2)} />
        <Tab label={t("tabs.4.title")} {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

export default memo(Navigation);
