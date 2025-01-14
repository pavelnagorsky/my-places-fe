import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectDistance,
  selectDuration,
} from "@/store/route-builder-slice/route-builder.slice";
import { TFunction, useTranslation } from "next-i18next";

function formatSeconds(seconds: number, t: TFunction) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}ч ${minutes}мин`;
}

function formatMeters(meters: number, locale: string) {
  const kilometers = meters / 1000;
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

  const formattedDistance = formatMeters(distance, i18n.language);
  const formattedDuration = formatSeconds(duration, t);
  return (
    <Stack
      zIndex={1}
      position={{ md: "sticky" }}
      top={{ md: "5.5em" }}
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
  );
};

export default Details;
