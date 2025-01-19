import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectDistance,
  selectDuration,
} from "@/store/route-builder-slice/route-builder.slice";
import { TFunction, useTranslation } from "next-i18next";
import OptimizeButton from "@/containers/route-builder/content/form/sections/control-buttons/OptimizeButton";

function formatMinutes(minutes: number, t: TFunction) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}ч ${+remainingMinutes.toFixed(0)}мин`;
}

function formatKM(kilometers: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "unit",
    maximumFractionDigits: 1,
    unit: "kilometer",
    unitDisplay: "short",
  }).format(kilometers);
}

const Details = () => {
  const { t, i18n } = useTranslation();
  const distance = useAppSelector(selectDistance);
  const duration = useAppSelector(selectDuration);

  const formattedDistance = formatKM(distance, i18n.language);
  const formattedDuration = formatMinutes(duration, t);
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
          Детали вашей поездки
        </Typography>
        <Typography fontWeight={500} fontSize={"18px"}>
          Время в пути:
        </Typography>
        <Typography fontWeight={600} fontSize={"40px"}>
          {formattedDuration}
        </Typography>
        <Typography fontWeight={500} fontSize={"18px"}>
          Километраж:
        </Typography>
        <Typography fontWeight={600} fontSize={"40px"}>
          {formattedDistance}
        </Typography>
      </Stack>
      <Box sx={{ "& button": { width: { lg: "100%" } } }}>
        <OptimizeButton />
      </Box>
    </Stack>
  );
};

export default Details;
