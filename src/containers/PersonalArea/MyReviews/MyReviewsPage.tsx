import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { FormProvider } from "react-hook-form-mui";
import InfiniteScroll from "react-infinite-scroll-component";
import PersonalAreaLayout from "@/containers/PersonalArea/Layout/PersonalAreaLayout";
import { BoxPlaceholder } from "@/components/UI/Placeholders/BoxPlaceholder";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/UI/Button/Button";
import { routerLinks } from "@/staticData/routerLinks";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import useMyReviews from "@/containers/PersonalArea/MyReviews/useMyReviews";
import ReviewItem from "@/containers/PersonalArea/MyReviews/ReviewItem/ReviewItem";
import ReviewItemsTableHead from "@/containers/PersonalArea/MyReviews/ReviewItem/ReviewItemsTableHead";
import Filters from "@/containers/PersonalArea/MyPlaces/Filters/Filters";

const MyReviewsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logic = useMyReviews();

  return (
    <PersonalAreaLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Box mb={"1em"}>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Stack
              mb={"30px"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography mb={0} variant={"h1"}>
                Мои заметки
              </Typography>
              {isMobile ? (
                <IconButton
                  href={routerLinks.createReview}
                  size={"small"}
                  color={"primary"}
                  sx={{ border: `1px solid ${theme.palette.primary.main}` }}
                >
                  <AddIcon color={"primary"} />
                </IconButton>
              ) : (
                <Button
                  linkTo={routerLinks.createReview}
                  sx={{ color: "primary" }}
                >
                  Новая заметка
                </Button>
              )}
            </Stack>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <FormProvider {...logic.formContext}>
              <Filters type={"reviews"} onSubmit={logic.onSubmit} />
            </FormProvider>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Box my={{ xs: "1.5em", md: "2.5em" }}>
              {logic.noReviews && (
                <Typography
                  variant={"body1"}
                  fontWeight={700}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Пользовательские заметки не найдены
                </Typography>
              )}

              <ReviewItemsTableHead
                orderBy={logic.orderBy}
                orderDirection={logic.orderDirection}
                show={!logic.noReviews}
                onChangeOrderBy={logic.setOrderBy}
                onChangeOrderDirection={logic.toggleOrderDirection}
              />
              <InfiniteScroll
                style={{
                  padding: "1em 0.5em 0.5em 0.5em",
                  //overflowX: "hidden",
                }}
                dataLength={logic.reviews.length}
                next={() => logic.onSubmit(false)}
                hasMore={logic.hasMore}
                loader={<BoxPlaceholder sx={{ mt: "2em" }} />}
              >
                <AnimatePresence mode="popLayout">
                  {logic.reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      layout
                      exit={{
                        opacity: 0,
                        //y: -10,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <ReviewItem
                        key={review.id}
                        review={review}
                        onDelete={logic.handleDelete}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </InfiniteScroll>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default MyReviewsPage;
