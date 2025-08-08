import { Box, BoxProps } from "@mui/material";
import { AdUnit } from "next-google-adsense";

const GoogleAdsUnit = ({
  slotId,
  ...boxProps
}: BoxProps & { slotId: string }) => {
  const { sx, ...otherBoxProps } = boxProps;
  return (
    <Box
      {...otherBoxProps}
      sx={{
        overflow: "hidden", // Hide scrollbars by default
        scrollbarWidth: "thin",
        ...sx,
      }}
    >
      <AdUnit slotId={slotId} layout="display" />
    </Box>
  );
};

export default GoogleAdsUnit;
