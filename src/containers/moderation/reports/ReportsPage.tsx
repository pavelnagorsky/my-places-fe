import useReports from "@/containers/moderation/reports/logic/useReports";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { Box, Stack, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form-mui";
import InfiniteScroll from "react-infinite-scroll-component";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import ModerationLayout from "@/containers/moderation/layout/ModerationLayout";
import ReportItem from "@/containers/moderation/reports/report-item/ReportItem";
import ReportItemsTableHead from "@/containers/moderation/reports/report-item/ReportItemsTableHead";
import Filters from "@/containers/moderation/reports/filters/Filters";
import { useTranslation } from "next-i18next";

const ReportsPage = () => {
  const { t } = useTranslation("moderation");
  const logic = useReports();

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
                {t("reports.title")}
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
              {logic.noItems && (
                <Typography
                  variant={"body1"}
                  fontWeight={600}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  {t("reports.notFound")}
                </Typography>
              )}
              <ReportItemsTableHead
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
                  {logic.items.map((report, index) => (
                    <motion.div
                      key={report.id}
                      layout
                      exit={{
                        opacity: 0,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <ReportItem report={report} />
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

export default ReportsPage;
