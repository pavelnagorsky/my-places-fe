import { useTranslation } from "next-i18next";
import useMyFavourites from "@/containers/personal-area/my-favourites/useMyFavourites";
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { Box, Hidden, IconButton, Stack, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form-mui";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import FavouriteItem from "@/containers/personal-area/my-favourites/favourite-item/FavouriteItem";
import FavouriteItemsTableHead from "@/containers/personal-area/my-favourites/favourite-item/FavouriteItemsTableHead";
import Filters from "./filters/Filters";

const MyFavouritesPage = () => {
  const { t } = useTranslation("personal-area");
  const logic = useMyFavourites();

  return (
    <PersonalAreaLayout>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Box mb={"2em"}>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Stack
              mb={"30px"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography mb={0} variant={"h1"}>
                {t("favourites.title")}
              </Typography>
            </Stack>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <FormProvider {...logic.formContext}>
              <Filters onSubmit={logic.onSubmit} />
            </FormProvider>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Box my={{ xs: "1.5em", md: "2.5em" }}>
              {!logic.loading && !logic.favourites.length && (
                <Typography
                  variant={"body1"}
                  fontWeight={600}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  {t("favourites.noItems")}
                </Typography>
              )}
              <Hidden mdDown>
                {logic.favourites.length > 0 && <FavouriteItemsTableHead />}
              </Hidden>
              {logic.loading && <BoxPlaceholder sx={{ mt: "2em" }} />}
              {logic.favourites.map((fav, index) => (
                <FavouriteItem
                  key={fav.id}
                  favourite={fav}
                  onDelete={logic.handleDelete}
                />
              ))}
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </PersonalAreaLayout>
  );
};

export default MyFavouritesPage;
