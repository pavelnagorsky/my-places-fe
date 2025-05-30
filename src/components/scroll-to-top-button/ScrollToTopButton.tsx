import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab, useScrollTrigger, Zoom } from "@mui/material";
import { memo, useCallback } from "react";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytics.enum";

const ScrollToTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });
  const sendAnalytics = useAnalytics();

  const scrollToTop = useCallback(() => {
    sendAnalytics(AnalyticsEventsEnum.CustomClick, { title: "scroll to top" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 32,
          right: { xs: 18, md: 32, lg: 64 },
          zIndex: 100,
        }}
      >
        <Fab
          onClick={scrollToTop}
          sx={{
            opacity: 0.7,
            boxShadow: "none",
          }}
          color="primary"
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default memo(ScrollToTopButton);
