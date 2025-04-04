import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
  Button as Btn,
} from "@mui/material";
import animationVariants from "@/shared/animation-variants";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import { motion } from "framer-motion";
import { FormContainer, FormProvider } from "react-hook-form-mui";
import MyStepper from "@/components/UI/stepper/MyStepper";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import { Button } from "@/components/UI/button/Button";
import { routerLinks } from "@/routing/routerLinks";
import ReviewPhotos from "@/containers/create-review/form/ReviewPhotos";
import ReviewText from "@/containers/create-review/form/ReviewText";
import useReviewModeration from "@/containers/moderation/reviews/review-moderation/useReviewModeration";
import ModerationForm from "@/containers/moderation/places/place-moderation/ModerationForm";
import { useTranslation } from "next-i18next";
import ModerationLayout from "../../layout/ModerationLayout";

const ReviewModeration = () => {
  const { t } = useTranslation(["moderation", "review-management", "common"]);
  const logic = useReviewModeration();

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
        <FormProvider {...logic.form}>
          <FormContainer formContext={logic.form} onSuccess={() => {}}>
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
                        {t("form.titleReview")}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
              <ModerationForm mode={"review"} id={logic.reviewId as number} />
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Box pb={{ xs: "1.5em", md: "2em" }}>
                <MyStepper totalOptions={3} activeOption={1} />
                <Typography
                  component={"h2"}
                  fontSize={{ xs: "20px", md: "30px" }}
                  my={{ xs: "0.5em", md: "0.4em" }}
                >
                  {t("form.place", { ns: "review-management" })}
                </Typography>
                <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                  {t("form.placeDescription", { ns: "review-management" })}
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent={{ xs: "center", sm: "unset" }}
                  alignItems={{ xs: "unset", md: "flex-start" }}
                  mt={"2em"}
                  gap={"1.5em"}
                >
                  <PlaceSelect readonly fieldName={"place"} />
                  <Button
                    disabled
                    variant={"contained"}
                    sx={{
                      fontWeight: 700,
                      py: "1em",
                      px: { sm: "1em", md: "2em" },
                      fontSize: { xs: "14px", md: "16px" },
                    }}
                    linkTo={routerLinks.createPlace}
                  >
                    {t("form.newPlace", { ns: "review-management" })}
                  </Button>
                </Stack>
              </Box>
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <ReviewPhotos readonly sx={{ pb: { xs: "1.5em", md: "2em" } }} />
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Box mb={"3em"}>
                <Box pb={{ xs: "1.5em", md: "2em" }} maxWidth={734}>
                  <ReviewText readonly />
                </Box>
              </Box>
            </motion.div>
          </FormContainer>
        </FormProvider>
      </motion.div>
    </ModerationLayout>
  );
};

export default ReviewModeration;
