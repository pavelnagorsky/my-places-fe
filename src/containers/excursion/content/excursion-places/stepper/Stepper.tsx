import { Box, debounce, Stack, SxProps, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";
import utils from "@/shared/utils";
import { useTranslation } from "next-i18next";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";

const Circle = ({ index }: { index: number }) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"primary.main"}
    bgcolor={primaryBackground}
    fontWeight={"700"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    {index + 1}
  </Stack>
);

const DashedLine = ({ sx, time }: { sx?: SxProps; time?: string }) => (
  <Box
    sx={{
      width: 2,
      height: { xs: "190px", sm: "270px" },
      borderRight: "1.5px dashed #D4D4D4",
      my: "0.2em",
      position: "relative",
      ...sx,
    }}
  >
    {time && (
      <Typography
        color={"primary"}
        fontWeight={600}
        fontSize={"15px"}
        sx={{
          position: "absolute",
          minWidth: "100px",
          textAlign: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "0.5em",
        }}
      >
        {time}
      </Typography>
    )}
  </Box>
);

const Stepper = ({ items }: { items: IExcursionPlace[] }) => {
  const { t } = useTranslation("common");

  const [cardHeights, setCardHeights] = useState<number[]>([]);

  const calculateLineHeights = useCallback(
    debounce(() => {
      const containerId = "cards-container";
      // calculation logic
      const container = document.getElementById(containerId);
      if (!container) return;

      const cards = Array.from(container.children);
      const heights = cards.map((card) => card.clientHeight);
      setCardHeights(heights);
    }, 300),
    []
  );

  useEffect(() => {
    const containerId = "cards-container";

    calculateLineHeights();

    // Optional: Add resize observer for dynamic content
    const resizeObserver = new ResizeObserver(calculateLineHeights);
    const container = document.getElementById(containerId);
    if (container) resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [items]);

  // Calculate line heights based on card halves
  const getLineHeight = (index: number) => {
    if (cardHeights.length === 0) return;

    const currentCardHeight = cardHeights[index] || 0;
    const nextCardHeight = cardHeights[index + 1] || 0;

    // Half of current card + half of next card + any margin between them - half of the first card
    return (
      currentCardHeight / 2 +
      nextCardHeight / 2 +
      16 - // 16px for typical MUI mb={4} margin
      40 // Circle height
    );
  };

  return (
    <Stack alignItems={"center"} pt={{ xs: "125px" }}>
      {items.map((item, i) => {
        const duration = items[i + 1]?.duration ?? 0;
        const formattedDuration = duration
          ? utils.formatMinutes(duration, {
              hoursTranslation: t("hours"),
              minutesTranslation: t("minutes"),
            })
          : undefined;
        const lineHeight = getLineHeight(i);
        return (
          <Fragment key={item.id}>
            <Stack direction={"row"} alignItems={"center"}>
              <Circle index={i} />
            </Stack>
            {i !== items.length - 1 && (
              <DashedLine
                time={formattedDuration}
                sx={{ height: { xs: lineHeight, sm: lineHeight } }}
              />
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default Stepper;
