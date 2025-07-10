import { useTranslation } from "next-i18next";
import useReviewModeration from "@/containers/moderation/reviews/review-moderation/useReviewModeration";
import {
  Backdrop,
  Box,
  Button as Btn,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ModerationLayout from "@/containers/moderation/layout/ModerationLayout";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { FormContainer, FormProvider } from "react-hook-form-mui";
import ModerationForm from "@/containers/moderation/places/place-moderation/ModerationForm";
import MyStepper from "@/components/UI/stepper/MyStepper";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import { Button } from "@/components/UI/button/Button";
import { routerLinks } from "@/routing/routerLinks";
import ReviewPhotos from "@/containers/create-review/form/ReviewPhotos";
import ReviewText from "@/containers/create-review/form/ReviewText";
import useExcursionModeration from "@/containers/moderation/excursions/excursion-moderation/logic/useExcursionModeration";
import ExcursionContent from "@/containers/excursion/content/ExcursionContent";
import ExcursionCitySelect from "@/containers/moderation/excursions/excursion-moderation/content/excursion-city-select/ExcursionCitySelect";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";

const ExcursionModeration = () => {
  const { t } = useTranslation([
    "moderation",
    "excursion-management",
    "common",
  ]);
  const logic = useExcursionModeration();

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={logic.loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <ModerationLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        {loader}
        <motion.div variants={animationVariants.defaultItemVariant}>
          <Box pb={{ xs: "1.5em", md: "1.5em" }}>
            <Stack
              direction={{ md: "row" }}
              gap={{ xs: "1.5em", md: "1em" }}
              justifyContent={"space-between"}
            >
              <Box overflow={"hidden"}>
                <Stack
                  direction={{ sm: "row" }}
                  columnGap={"1em"}
                  rowGap={"0.5em"}
                  alignItems={{ sm: "center" }}
                  mb={{ xs: "1em", md: "1.5em" }}
                >
                  <Box order={{ xs: 1, sm: 0 }}>
                    <Btn
                      onClick={logic.onGoBack}
                      sx={{ borderRadius: "10px", textTransform: "none" }}
                      variant={"outlined"}
                      color={"secondary"}
                    >
                      {t("buttons.back", { ns: "common" })}
                    </Btn>
                  </Box>
                  <Typography
                    variant={"h1"}
                    mb={0}
                    fontSize={{ xs: "24px", sm: "30px", md: "40px" }}
                  >
                    {t("form.titleExcursion")}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <ModerationForm
            mode={"excursion"}
            id={logic.excursionId as number}
            excursionCitySelect={
              logic.excursion?.type === ExcursionTypesEnum.Overview && (
                <ExcursionCitySelect fieldName={"excursionCity"} />
              )
            }
          />
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          {!!logic.excursion && (
            <Box mb={"2em"}>
              <ExcursionContent excursion={logic.excursion} />
            </Box>
          )}
        </motion.div>
      </motion.div>
    </ModerationLayout>
  );
};

export default ExcursionModeration;
