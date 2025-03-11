import { useTranslation } from "next-i18next";
import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";
import utils from "@/shared/utils";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";

const ExcursionAdditionalInfo = ({ item }: { item: IExcursionListItem }) => {
  const { t, i18n } = useTranslation("personal-area");
  const travelModes = useTravelModeOptions();
  const formattedDistance = utils.formatKM(item.distance, i18n.language);
  const formattedDuration = utils.formatMinutes(item.duration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });
  const formattedExcursionDuration = utils.formatMinutes(
    item.excursionDuration,
    {
      hoursTranslation: t("hours", { ns: "common" }),
      minutesTranslation: t("minutes", { ns: "common" }),
    }
  );

  return (
    <Box>
      <Divider sx={{ borderColor: "disabled", my: "1em" }} />
      <Grid
        container
        spacing={{ xs: "1em", md: "2em" }}
        justifyContent={{ xs: "start", sm: "center" }}
      >
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("excursions.headings.distance")}: {formattedDistance}
          </Typography>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("excursions.headings.duration")}: {formattedDuration}
          </Typography>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("excursions.headings.excursionDuration")}:{" "}
            {formattedExcursionDuration}
          </Typography>
        </Grid>
        <Grid size={{ xs: "auto" }}>
          <Typography variant={"body1"}>
            {t("excursions.headings.travelMode")}:{" "}
            {travelModes.find((mode) => mode.id === item.travelMode)?.label ||
              "-"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExcursionAdditionalInfo;
