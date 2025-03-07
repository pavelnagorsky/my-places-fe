import { useAppSelector } from "@/store/hooks";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import { Fragment } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { selectItems } from "@/store/excursion-builder-slice/excursion-builder.slice";
import utils from "@/shared/utils";
import { useTranslation } from "next-i18next";

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
      height: { xs: "190px", sm: "265px" },
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

const Stepper = () => {
  const { t } = useTranslation("common");
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} pt={{ xs: "150px" }}>
      {items.map((item, i) => {
        const duration = items[i + 1]?.duration ?? 0;
        const formattedDuration = duration
          ? utils.formatMinutes(duration, {
              hoursTranslation: t("hours"),
              minutesTranslation: t("minutes"),
            })
          : undefined;
        return (
          <Fragment key={item.id}>
            <Stack direction={"row"} alignItems={"center"}>
              <Circle index={i} />
            </Stack>
            {i !== items.length - 1 && <DashedLine time={formattedDuration} />}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default Stepper;
