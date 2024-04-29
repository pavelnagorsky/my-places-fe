import {
  Backdrop,
  Box,
  Button as Btn,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { FormContainer, FormProvider } from "react-hook-form-mui";
import UpdateTranslations from "@/containers/personal-area/edit-my-place/UpdateTranslations";
import ButtonWithTooltip from "@/components/UI/button/ButtonWithTooltip";
import MyStepper from "@/components/UI/stepper/MyStepper";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import { Button } from "@/components/UI/button/Button";
import { routerLinks } from "@/routing/routerLinks";
import ReviewPhotos from "@/containers/create-review/form/ReviewPhotos";
import ReviewText from "@/containers/create-review/form/ReviewText";
import useEditReview from "@/containers/admin/places/place/tabs/reviews/edit/useEditReview";
import AdminLayout from "@/containers/admin/layout/AdminLayout";

const EditReview = () => {
  const logic = useEditReview();
  const loading = logic.submitLoading;

  const loader = (
    <Box>
      <Backdrop sx={{ zIndex: 1000 }} open={logic.loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );

  return (
    <AdminLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        style={{ padding: "1em" }}
        initial="hidden"
        animate="show"
      >
        {loader}
        <FormProvider {...logic.form}>
          <FormContainer formContext={logic.form} onSuccess={logic.onSubmit}>
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
                          Назад
                        </Btn>
                      </Box>
                      <Typography
                        variant={"h1"}
                        mb={0}
                        fontSize={{ xs: "24px", sm: "30px", md: "40px" }}
                      >
                        Редактирование заметки
                      </Typography>
                    </Stack>
                    <UpdateTranslations mt={"0.5em"} />
                  </Box>
                  <div>
                    <ButtonWithTooltip
                      loading={loading}
                      buttonText={"Обновить"}
                      tooltipText={"Не все обязательные поля формы заполнены!"}
                      variant={"contained"}
                      type={"submit"}
                      disabled={
                        !logic.form.formState.isValid ||
                        !logic.form.formState.isDirty
                      }
                      sx={{
                        fontWeight: 700,
                        py: "1em",
                        width: "100%",
                        maxWidth: { sm: "250px" },
                      }}
                    />
                  </div>
                </Stack>
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
                </Box>
              </Box>
            </motion.div>
          </FormContainer>
        </FormProvider>
      </motion.div>
    </AdminLayout>
  );
};

export default EditReview;
