import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectDistance,
  selectDuration,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { useTranslation } from "next-i18next";
import utils from "@/shared/utils";
import ExcursionType from "@/containers/excursion-builder/content/form/content/excurion-type/ExcursionType";
import OptimizeButton from "@/containers/excursion-builder/content/form/content/control-buttons/OptimizeButton";
import { useFormContext, useWatch } from "react-hook-form-mui";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import useExcursionPlacesFieldArrayContext from "@/containers/excursion-builder/content/form/content/excursion-places/context/useExcursionPlacesFieldArrayContext";

const Details = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const { control } = useFormContext<IExcursionBuilderForm>();
  const { fields } = useExcursionPlacesFieldArrayContext();
  // @ts-ignore
  const excursionDurations: number[] = useWatch({
    control,
    name: fields.map((_, idx) => `places.${idx}.excursionDuration`),
  });
  const totalExcursionsDuration = excursionDurations.reduce((acc, cur) => {
    acc += cur || 0;
    return acc;
  }, 0);
  const distance = useAppSelector(selectDistance);
  const duration = useAppSelector(selectDuration);
  const formattedDistance = utils.formatKM(distance, i18n.language);
  const formattedDuration = utils.formatMinutes(duration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });
  const formattedStayDuration = utils.formatMinutes(totalExcursionsDuration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });

  return (
    <Stack zIndex={1} position={{ lg: "sticky" }} top={{ lg: "5.5em" }} gap={2}>
      <Typography variant={"h2"} pb={"0em"}>
        {t("details.title")}
      </Typography>
      <Stack
        gap={1}
        borderRadius={"15px"}
        bgcolor={"primary.main"}
        p={"1em"}
        color={"white"}
      >
        <Typography fontWeight={500} fontSize={"18px"}>
          {t("details.duration")}
        </Typography>
        <Typography fontWeight={600} fontSize={"40px"}>
          {formattedDuration}
        </Typography>
        <Typography fontWeight={500} fontSize={"18px"}>
          {t("details.stayDuration")}
        </Typography>
        <Typography fontWeight={600} fontSize={"40px"}>
          {formattedStayDuration}
        </Typography>
        <Typography fontWeight={500} fontSize={"18px"}>
          {t("details.distance")}
        </Typography>
        <Typography fontWeight={600} fontSize={"40px"}>
          {formattedDistance}
        </Typography>
      </Stack>
      <Box sx={{ "& button": { width: { lg: "100%" } } }}>
        <OptimizeButton />
      </Box>
      <Box mt={"0.5em"}>
        <ExcursionType />
      </Box>
    </Stack>
  );
};

export default Details;
