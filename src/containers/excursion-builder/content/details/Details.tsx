import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectDistance,
  selectDuration,
} from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import utils from "@/shared/utils";
import ExcursionType from "@/containers/excursion-builder/content/form/content/excurion-type/ExcursionType";
import OptimizeButton from "@/containers/excursion-builder/content/form/content/control-buttons/OptimizeButton";

const Details = () => {
  const { t, i18n } = useTranslation(["route-management", "common"]);
  const distance = useAppSelector(selectDistance);
  const duration = useAppSelector(selectDuration);
  const formattedDistance = utils.formatKM(distance, i18n.language);
  const formattedDuration = utils.formatMinutes(duration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });

  return (
    <Stack zIndex={1} position={{ md: "sticky" }} top={{ md: "5.5em" }} gap={2}>
      <Stack
        gap={1}
        borderRadius={"15px"}
        bgcolor={"primary.main"}
        p={"1em"}
        color={"white"}
      >
        <Typography fontWeight={600} fontSize={"22px"} gutterBottom>
          {t("details.title")}
        </Typography>
        <Typography fontWeight={500} fontSize={"18px"}>
          {t("details.duration")}
        </Typography>
        <Typography fontWeight={600} fontSize={"40px"}>
          {formattedDuration}
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
