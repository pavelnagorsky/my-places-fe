import useReports from "@/containers/moderation/reports/useReports";
import { AnimatePresence, motion } from "framer-motion";
import animationVariants from "@/shared/animation-variants";
import { Box, Stack, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form-mui";
import InfiniteScroll from "react-infinite-scroll-component";
import { BoxPlaceholder } from "@/components/UI/placeholders/BoxPlaceholder";
import ModerationLayout from "@/containers/moderation/layout/ModerationLayout";
import ReportItem from "@/containers/moderation/reports/report-item/ReportItem";
import ReportItemsTableHead from "@/containers/moderation/reports/report-item/ReportItemsTableHead";

const ReportsPage = () => {
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
                Жалобы пользователей
              </Typography>
            </Stack>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <FormProvider {...logic.formContext}>
              {/*<Filters onSubmit={logic.onSubmit} type={"places"} />*/}
            </FormProvider>
          </motion.div>
          <motion.div variants={animationVariants.defaultItemVariant}>
            <Box my={{ xs: "1.5em", md: "2.5em" }}>
              {logic.noReports && (
                <Typography
                  variant={"body1"}
                  fontWeight={600}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Жалобы не найдены
                </Typography>
              )}
              <ReportItemsTableHead
                orderBy={logic.orderBy}
                orderDirection={logic.orderDirection}
                show={!logic.noReports}
                onChangeOrderBy={logic.setOrderBy}
                onChangeOrderDirection={logic.toggleOrderDirection}
              />
              <InfiniteScroll
                style={{
                  padding: "1em 0.5em 0.5em 0.5em",
                  //overflowX: "hidden",
                }}
                dataLength={logic.reports.length}
                next={() => logic.onSubmit(false)}
                hasMore={logic.hasMore}
                loader={<BoxPlaceholder sx={{ mt: "2em" }} />}
              >
                <AnimatePresence mode="popLayout">
                  {logic.reports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      layout
                      exit={{
                        opacity: 0,
                        //y: -10,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                    >
                      <ReportItem
                        report={report}
                        onChangeStatus={logic.onChangeStatus}
                      />
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
