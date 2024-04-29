import { Box, Stack, Typography } from "@mui/material";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { Button } from "@/components/UI/button/Button";
import MyStepper from "@/components/UI/stepper/MyStepper";
import { useFormContext } from "react-hook-form-mui";
import backgroundImage from "/public/images/create-review-page/background.jpg";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import { IReviewFormContext } from "@/containers/create-review/form/interfaces";
import { routerLinks } from "@/routing/routerLinks";
import ButtonWithTooltip from "@/components/UI/button/ButtonWithTooltip";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import ReviewPhotos from "@/containers/create-review/form/ReviewPhotos";
import ReviewText from "@/containers/create-review/form/ReviewText";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { useTranslation } from "next-i18next";

interface IReviewFormProps {
  loading: boolean;
}

const ReviewForm = ({ loading }: IReviewFormProps) => {
  const { t } = useTranslation(["review-management", "common"]);
  const { formState } = useFormContext<IReviewFormContext>();

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={animationVariants.defaultItemVariant}>
        <WrappedContainer>
          <Breadcrumbs />
          <Box pt="1.5em" pb={{ xs: "1.5em", md: "2em" }}>
            <Typography
              variant={"h1"}
              // fontSize={{ xs: "25px", md: "32px" }}
              mb={"0.5em"}
            >
              {t("creation.title")}
            </Typography>
            <Typography variant={"body2"} fontSize={{ md: "20px" }}>
              {t("creation.description")}
            </Typography>
          </Box>
        </WrappedContainer>
      </motion.div>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <Box bgcolor={primaryBackground}>
          <WrappedContainer bgColor={"transparent"}>
            <Box py={{ xs: "1.5em", md: "2em" }}>
              <MyStepper totalOptions={3} activeOption={1} />
              <Typography
                component={"h2"}
                fontSize={{ xs: "20px", md: "30px" }}
                my={{ xs: "0.5em", md: "0.4em" }}
              >
                {t("form.place")}
              </Typography>
              <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                {t("form.placeDescription")}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={{ xs: "center", sm: "unset" }}
                alignItems={{ xs: "unset", md: "flex-start" }}
                mt={"2em"}
                gap={"1.5em"}
              >
                <PlaceSelect fieldName={"place"} required />
                <Button
                  variant={"contained"}
                  sx={{
                    fontWeight: 700,
                    py: "1em",
                    px: { sm: "1em", md: "2em" },
                    fontSize: { xs: "14px", md: "16px" },
                  }}
                  linkTo={routerLinks.createPlace}
                >
                  {t("form.newPlace")}
                </Button>
              </Stack>
            </Box>
          </WrappedContainer>
        </Box>
      </motion.div>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <WrappedContainer>
          <ReviewPhotos
            canDeleteByAPI
            sx={{ py: { xs: "1.5em", md: "2em" } }}
          />
        </WrappedContainer>
      </motion.div>
      <motion.div variants={animationVariants.defaultItemVariant}>
        <Box
          sx={{
            backgroundImage: `url(${backgroundImage.src})`,
          }}
          mb={"3em"}
        >
          <WrappedContainer bgColor={"transparent"}>
            <Box py={{ xs: "1.5em", md: "2em" }} maxWidth={734}>
              <ReviewText />
              <div>
                <ButtonWithTooltip
                  loading={loading}
                  buttonText={t("buttons.create", { ns: "common" })}
                  tooltipText={t("errors.allFieldsRequired", { ns: "common" })}
                  variant={"contained"}
                  type={"submit"}
                  disabled={!formState.isValid}
                  sx={{
                    fontWeight: 700,
                    mt: "2em",
                    py: "1em",
                    width: "100%",
                    maxWidth: { sm: "250px" },
                  }}
                />
              </div>
            </Box>
          </WrappedContainer>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ReviewForm;
