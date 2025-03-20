import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";
import Stepper from "@/containers/excursion/content/excursion-places/stepper/Stepper";
import ExcursionPlaceCard from "@/containers/excursion/content/excursion-places/excursion-place-card/ExcursionPlaceCard";
import { useTranslation } from "next-i18next";

const ExcursionPlaces = ({ items }: { items: IExcursionPlace[] }) => {
  const { t } = useTranslation("excursion-management");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack>
      <Typography
        variant={"h2"}
        pb={"1em"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        {t("excursion.routeDetails")}
      </Typography>
      <Stack direction={"row"} gap={{ xs: "1em", md: "2em" }} height={"100%"}>
        {!isMobile && <Stepper items={items} />}
        <Stack gap={2} width={"100%"}>
          <Stack gap={"1em"} width={"100%"}>
            <AnimatePresence mode="popLayout">
              {items.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, scale: 0.5, x: -400 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <ExcursionPlaceCard place={place} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ExcursionPlaces;
