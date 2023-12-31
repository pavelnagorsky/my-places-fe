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
import useMyPlaces from "@/containers/personal-area/my-places/useMyPlaces";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import PlaceItem from "@/containers/personal-area/my-places/place-item/PlaceItem";
import PlaceItemsTableHead from "@/containers/personal-area/my-places/place-item/PlaceItemsTableHead";
import Filters from "./filters/Filters";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/UI/button/Button";
import { routerLinks } from "@/routing/routerLinks";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";

const MyPlacesPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logic = useMyPlaces();

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
                Мои места
              </Typography>
              {isMobile ? (
                <IconButton
                  href={routerLinks.createPlace}
                  size={"small"}
                  color={"primary"}
                  sx={{ border: `1px solid ${theme.palette.primary.main}` }}
                >
                  <AddIcon color={"primary"} />
                </IconButton>
              ) : (
                <Button
                  linkTo={routerLinks.createPlace}
                  sx={{ color: "primary" }}
                >
                  Новое место
                </Button>
              )}
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
                  fontWeight={700}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Пользовательские места не найдены
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
                      <PlaceItem place={place} onDelete={logic.handleDelete} />
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

export default MyPlacesPage;
