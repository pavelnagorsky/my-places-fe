import { memo } from "react";
import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@mui/material";
import StyledReviewsContainer from "@/components/UI/review-containers/StyledReviewsContainer";

const ExcursionDescription = ({ description }: { description: string }) => {
  const { t } = useTranslation("excursion-management");
  function createMarkup() {
    return { __html: description };
  }

  return (
    <Stack>
      <Typography
        variant={"h2"}
        pb={"0.5em"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        {t("excursion.description")}
      </Typography>
      <Box height={"100%"}>
        <StyledReviewsContainer
          fontSize={{ xs: "16px", md: "18px" }}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </Box>
    </Stack>
  );
};

export default memo(ExcursionDescription);
