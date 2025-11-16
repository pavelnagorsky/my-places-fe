import { useAppSelector } from "@/store/hooks";
import { Stack } from "@mui/material";
import { Fragment } from "react";
import HomeIcon from "@mui/icons-material/Home";
import utils from "@/shared/utils";
import { useTranslation } from "next-i18next";
import {
  selectItems,
  selectRouteLastLeg,
} from "@/store/route-builder-slice/route-builder.selectors";
import StepperDashedLine from "@/containers/excursion-builder/content/form/content/excursion-places/stepper/content/StepperDashedLine";
import StepperCircle from "@/containers/excursion-builder/content/form/content/excursion-places/stepper/content/StepperCircle";
import StepperIconCircle from "@/containers/route-builder/content/form/sections/stepper/content/StepperIconCircle";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Stepper = () => {
  const { t } = useTranslation();
  const items = useAppSelector(selectItems);
  const { watch } = useFormContext<IRouteBuilderForm>();
  const endCoordinates = watch("searchTo.coordinates");
  const hasEndCoordinates = !!endCoordinates;
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
      <StepperIconCircle>
        <HomeIcon />
      </StepperIconCircle>
      {items.length > 0 && (
        <StepperDashedLine
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
              <StepperCircle index={i} />
            </Stack>
            {i !== items.length - 1 && (
              <StepperDashedLine
                sx={{ height: { xs: "190px", sm: "170px" } }}
                time={formattedDuration}
              />
            )}
            {i === items.length - 1 &&
              hasEndCoordinates &&
              !!formattedLastLegDuration && (
                <>
                  <StepperDashedLine
                    sx={{ height: "100px" }}
                    time={formattedLastLegDuration}
                  />
                  <StepperIconCircle>
                    <LocationOnIcon />
                  </StepperIconCircle>
                </>
              )}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default Stepper;
