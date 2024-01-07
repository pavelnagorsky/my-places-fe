import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
  Button as Btn,
} from "@mui/material";
import useEditMyReview from "@/containers/personal-area/edit-my-review/useEditMyReview";
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
import ButtonWithTooltip from "@/components/UI/button/ButtonWithTooltip";
import utils from "@/shared/utils";
import UpdateTranslations from "@/containers/personal-area/edit-my-place/UpdateTranslations";

const EditMyReview = () => {
  const logic = useEditMyReview();
  const loading = logic.submitLoading;

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={logic.loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <PersonalAreaLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        {loader}
        <FormProvider {...logic.form}>
          <FormContainer formContext={logic.form} onSuccess={logic.onSubmit}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Box pb={{ xs: "1.5em", md: "1.5em" }}>
                <Box overflow={"hidden"}>
                  <Stack
                    direction={{ sm: "row", md: "column", lg: "row" }}
                    columnGap={"1em"}
                    rowGap={"0.5em"}
                    alignItems={{ sm: "center", md: "unset", lg: "center" }}
                    mb={"0.5em"}
                  >
                    <Box order={{ xs: 1, sm: 0, md: 1, lg: 0 }}>
                      <Btn
                        onClick={logic.onGoBack}
                        sx={{ borderRadius: "10px", textTransform: "none" }}
                        variant={"outlined"}
                        color={"secondary"}
                      >
                        Назад
                      </Btn>
                    </Box>
                    <Typography
                      component={"h1"}
                      fontSize={{ xs: "25px", md: "32px" }}
                    >
                      Редактирование заметки
                    </Typography>
                  </Stack>
                  <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                    После редактирования заметка будет отправлена на модерацию.
                  </Typography>
                  <UpdateTranslations mt={"0.5em"} />
                </Box>
              </Box>
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Box pb={{ xs: "1.5em", md: "2em" }}>
                <MyStepper totalOptions={3} activeOption={1} />
                <Typography
                  component={"h2"}
                  fontSize={{ xs: "20px", md: "30px" }}
                  my={{ xs: "0.5em", md: "0.4em" }}
                >
                  Достопримечательность
                </Typography>
                <Typography variant={"body2"} fontSize={{ md: "20px" }}>
                  На этом этапе вам нужно выбрать достопримечательность из
                  выпадающего списка или создать новую.
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent={{ xs: "center", sm: "unset" }}
                  alignItems={{ xs: "unset", sm: "flex-start" }}
                  mt={"2em"}
                  gap={"1.5em"}
                >
                  <PlaceSelect fieldName={"place"} />
                  <Button
                    variant={"contained"}
                    sx={{
                      fontWeight: 700,
                      py: "1em",
                      fontSize: { xs: "14px", sm: "16px" },
                    }}
                    linkTo={routerLinks.createPlace}
                  >
                    Новое место
                  </Button>
                </Stack>
              </Box>
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <ReviewPhotos sx={{ pb: { xs: "1.5em", md: "2em" } }} />
            </motion.div>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Box mb={"3em"}>
                <Box pb={{ xs: "1.5em", md: "2em" }} maxWidth={734}>
                  <ReviewText />
                  <div>
                    <ButtonWithTooltip
                      loading={loading}
                      buttonText={"Обновить"}
                      tooltipText={"Не все обязательные поля формы заполнены!"}
                      variant={"contained"}
                      type={"submit"}
                      disabled={
                        !logic.form.formState.isValid ||
                        utils.isEmptyObject(logic.form.formState.dirtyFields)
                      }
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
              </Box>
            </motion.div>
          </FormContainer>
        </FormProvider>
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default EditMyReview;
