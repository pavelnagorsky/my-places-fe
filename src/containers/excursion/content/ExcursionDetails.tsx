import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import utils from "@/shared/utils";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";
import NavigatorControls from "@/containers/excursion/content/map-section/navigator-export/NavigatorControls";

const ExcursionDetails = ({ excursion }: { excursion: IExcursion }) => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const types = useExcursionTypes();
  const type = types.find((type) => type.id === excursion.type);
  const travelModes = useTravelModeOptions();
  const travelMode = travelModes.find(
    (mode) => mode.id === excursion.travelMode
  );

  const formattedDistance = utils.formatKM(excursion.distance, i18n.language);
  const formattedDuration = utils.formatMinutes(excursion.duration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });
  const formattedStayDuration = utils.formatMinutes(
    excursion.excursionDuration,
    {
      hoursTranslation: t("hours", { ns: "common" }),
      minutesTranslation: t("minutes", { ns: "common" }),
    }
  );

  return (
    <Stack zIndex={1} position={{ lg: "sticky" }} top={{ lg: "5.5em" }} gap={4}>
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
      <Stack direction={{ xl: "row" }} gap={2}>
        {type && (
          <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
            {type.image && (
              <Box
                bgcolor={"#FFE9D6"}
                borderRadius={"5px"}
                position={"relative"}
                p={"0.5em"}
                height={56}
                width={56}
                sx={{
                  "& img": {
                    objectFit: "cover",
                  },
                }}
              >
                <Box
                  src={type.image}
                  alt={type.label}
                  component={"img"}
                  height={40}
                  width={40}
                />
              </Box>
            )}
            <Typography variant={"body2"} fontSize={{ xs: "16px", md: "20px" }}>
              {type.label}
            </Typography>
          </Stack>
        )}
        {travelMode && (
          <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
            {travelMode.image && (
              <Box
                bgcolor={"#FFE9D6"}
                borderRadius={"5px"}
                position={"relative"}
                p={"0.5em"}
                height={56}
                width={56}
                sx={{
                  "& img": {
                    objectFit: "cover",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={travelMode.image}
                  alt={travelMode.label}
                  height={40}
                  width={40}
                />
              </Box>
            )}
            <Typography variant={"body2"} fontSize={{ xs: "16px", md: "20px" }}>
              {travelMode.label}
            </Typography>
          </Stack>
        )}
      </Stack>
      {!isMobile && (
        <Stack
          sx={{
            "& .NavigationRoot": {
              flexDirection: "column",
              alignItems: "start",
            },
          }}
        >
          <NavigatorControls excursion={excursion} />
        </Stack>
      )}
    </Stack>
  );
};

export default ExcursionDetails;
