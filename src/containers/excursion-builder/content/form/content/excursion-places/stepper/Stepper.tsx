import { useAppSelector } from "@/store/hooks";
import { Stack } from "@mui/material";
import { Fragment } from "react";
import { selectItems } from "@/store/excursion-builder-slice/excursion-builder.slice";
import utils from "@/shared/utils";
import { useTranslation } from "next-i18next";
import StepperCircle from "@/containers/excursion-builder/content/form/content/excursion-places/stepper/content/StepperCircle";
import StepperDashedLine from "@/containers/excursion-builder/content/form/content/excursion-places/stepper/content/StepperDashedLine";

const Stepper = () => {
  const { t } = useTranslation("common");
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} pt={{ xs: "130px" }}>
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
              <StepperDashedLine time={formattedDuration} />
            )}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default Stepper;
