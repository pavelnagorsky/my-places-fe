import { useAppSelector } from "@/store/hooks";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import { Fragment, PropsWithChildren } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";
import HomeIcon from "@mui/icons-material/Home";
import utils from "@/shared/utils";
import { DashedLine } from "@/containers/excursion-builder/content/form/content/excursion-places/stepper/Stepper";
import { useTranslation } from "next-i18next";
import {
  selectItems,
  selectRouteDirections,
  selectRouteLastLeg,
} from "@/store/route-builder-slice/route-builder.selectors";

const PrimaryCircle = ({ children }: PropsWithChildren) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"white"}
    bgcolor={"primary.main"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    {children}
  </Stack>
);

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

const Stepper = () => {
  const { t } = useTranslation();
  const items = useAppSelector(selectItems);
  const firstPlaceDuration = items[0]?.duration ?? null;
  const formattedFirstPlaceDuration = firstPlaceDuration
    ? utils.formatMinutes(firstPlaceDuration, {
        hoursTranslation: t("hours"),
        minutesTranslation: t("minutes"),
      })
    : undefined;
  // select end leg and show in the end
  const lastLeg = useAppSelector(selectRouteLastLeg);
  const formattedLastLegDuration = lastLeg
    ? utils.formatMinutes(lastLeg.duration, {
        hoursTranslation: t("hours"),
        minutesTranslation: t("minutes"),
      })
    : undefined;

  return (
    <Stack alignItems={"center"} py={{ xs: "80px" }}>
      <PrimaryCircle>
        <HomeIcon />
      </PrimaryCircle>
      {items.length > 0 && (
        <DashedLine
          sx={{ height: { sm: "140px" } }}
          time={formattedFirstPlaceDuration}
        />
      )}
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
            {i !== items.length - 1 && (
              <DashedLine
                sx={{ height: { xs: "190px", sm: "170px" } }}
                time={formattedDuration}
              />
            )}
            {i === items.length - 1 && !!formattedLastLegDuration && (
              <DashedLine
                sx={{ height: "100px" }}
                time={formattedLastLegDuration}
              />
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default Stepper;
