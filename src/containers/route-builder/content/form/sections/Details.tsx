import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectDistance,
  selectDuration,
} from "@/store/route-builder-slice/route-builder.slice";
import { TFunction, useTranslation } from "next-i18next";
import OptimizeButton from "@/containers/route-builder/content/form/sections/control-buttons/OptimizeButton";
import utils from "@/shared/utils";

const Details = () => {
  const { t, i18n } = useTranslation();
  const distance = useAppSelector(selectDistance);
  const duration = useAppSelector(selectDuration);
  const formattedDistance = utils.formatKM(distance, i18n.language);
  const formattedDuration = utils.formatMinutes(duration, t);

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
