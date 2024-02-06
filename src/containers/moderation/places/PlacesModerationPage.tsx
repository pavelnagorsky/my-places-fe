import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { FormProvider } from "react-hook-form-mui";
import InfiniteScroll from "react-infinite-scroll-component";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import useModerationPlaces from "@/containers/moderation/places/useModerationPlaces";
import ModerationLayout from "@/containers/moderation/layout/ModerationLayout";
import Filters from "@/containers/moderation/places/filters/Filters";
import PlaceItemsTableHead from "@/containers/moderation/places/place-item/PlaceItemsTableHead";
import PlaceItem from "@/containers/moderation/places/place-item/PlaceItem";

const PlacesModerationPage = () => {
  const { t } = useTranslation();
  const logic = useModerationPlaces();

  return (
    <ModerationLayout>
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
                Места на модерацию
              </Typography>
            </Stack>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <FormProvider {...logic.formContext}>
              <Filters onSubmit={logic.onSubmit} type={"places"} />
            </FormProvider>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Box my={{ xs: "1.5em", md: "2.5em" }}>
              {logic.noPlaces && (
                <Typography
                  variant={"body1"}
                  fontWeight={600}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Места, требующие модерации не найдены
                </Typography>
              )}
              <PlaceItemsTableHead
                orderBy={logic.orderBy}
                orderDirection={logic.orderDirection}
                show={!logic.noPlaces}
                onChangeOrderBy={logic.setOrderBy}
                onChangeOrderDirection={logic.toggleOrderDirection}
              />
              <InfiniteScroll
                style={{
                  padding: "1em 0.5em 0.5em 0.5em",
                  //overflowX: "hidden",
                }}
                dataLength={logic.places.length}
                next={() => logic.onSubmit(false)}
                hasMore={logic.hasMore}
                loader={<BoxPlaceholder sx={{ mt: "2em" }} />}
              >
                <AnimatePresence mode="popLayout">
                  {logic.places.map((place, index) => (
                    <motion.div
                      key={place.id}
                      layout
                      exit={{
                        opacity: 0,
                        //y: -10,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <PlaceItem place={place} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </InfiniteScroll>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </ModerationLayout>
  );
};

export default PlacesModerationPage;
