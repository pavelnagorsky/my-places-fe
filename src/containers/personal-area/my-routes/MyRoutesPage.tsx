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
import PersonalAreaLayout from "@/containers/personal-area/layout/PersonalAreaLayout";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import Filters from "./filters/Filters";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/UI/button/Button";
import { routerLinks } from "@/routing/routerLinks";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import NextLink from "next/link";
import useMyRoutes from "@/containers/personal-area/my-routes/useMyRoutes";
import RouteItemsTableHead from "@/containers/personal-area/my-routes/route-item/RouteItemsTableHead";
import RouteItem from "@/containers/personal-area/my-routes/route-item/RouteItem";

const MyRoutesPage = () => {
  const { t } = useTranslation("personal-area");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logic = useMyRoutes();

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
                {t("routes.title")}
              </Typography>
              {isMobile ? (
                <NextLink href={routerLinks.createRoute}>
                  <IconButton
                    size={"small"}
                    sx={{
                      border: `1px solid ${theme.palette.primary.main}`,
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                      "& svg": { fill: "white" },
                    }}
                  >
                    <AddIcon color={"primary"} />
                  </IconButton>
                </NextLink>
              ) : (
                <Button
                  variant={"contained"}
                  linkTo={routerLinks.createRoute}
                  sx={{ color: "primary", height: "44px" }}
                >
                  {t("routes.newRoute")}
                </Button>
              )}
            </Stack>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <FormProvider {...logic.formContext}>
              <Filters onSubmit={logic.onSubmit} />
            </FormProvider>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Box my={{ xs: "1.5em", md: "2.5em" }}>
              {logic.noItems && (
                <Typography
                  variant={"body1"}
                  fontWeight={600}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  {t("routes.noItems")}
                </Typography>
              )}
              <RouteItemsTableHead
                orderBy={logic.orderBy}
                orderDirection={logic.orderDirection}
                show={!logic.noItems}
                onChangeOrderBy={logic.changeOrderBy}
                onChangeOrderDirection={logic.toggleOrderDirection}
              />
              <InfiniteScroll
                style={{
                  padding: "1em 0.5em 0.5em 0.5em",
                  //overflowX: "hidden",
                }}
                dataLength={logic.items.length}
                next={() => logic.onSubmit(false)}
                hasMore={logic.hasMore}
                loader={<BoxPlaceholder sx={{ mt: "2em" }} />}
              >
                <AnimatePresence mode="popLayout">
                  {logic.items.map((route, index) => (
                    <motion.div
                      key={route.id}
                      layout
                      exit={{
                        opacity: 0,
                        //y: -10,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <RouteItem route={route} onDelete={logic.handleDelete} />
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

export default MyRoutesPage;
