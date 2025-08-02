import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { Box, Stack, Typography } from "@mui/material";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import ExcursionContent from "@/containers/excursion/content/ExcursionContent";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import YandexAd, {
  YandexAdBlockIdsEnum,
  YandexAdTypesEnum,
} from "@/components/ads/yandex/YandexAd";

const Comments = dynamic(
  () => import("@/containers/place/content/comments/Comments"),
  { ssr: false }
);

const ExcursionPage = ({ excursion }: { excursion: IExcursion }) => {
  const { t } = useTranslation("common");
  return (
    <WrappedContainer>
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Stack mb={2} display={{ xs: "none", md: "flex" }}>
          <Breadcrumbs customEnding={excursion.title} />
        </Stack>
        <Box mb={6}>
          <ExcursionContent excursion={excursion} />
          <Box mt={6} maxWidth={"md"}>
            <Typography
              variant={"h2"}
              component={"h2"}
              fontSize={{ xs: "24px", md: "30px" }}
            >
              {t("comments.title")}
            </Typography>
            <Comments
              entityId={excursion.id}
              entityType={StatisticEntitiesEnum.Excursion}
            />
          </Box>
          <YandexAd
            blockId={YandexAdBlockIdsEnum.DefaultFeed}
            type={YandexAdTypesEnum.FEED}
            my={"2em"}
          />
        </Box>
      </motion.div>
    </WrappedContainer>
  );
};

export default ExcursionPage;
