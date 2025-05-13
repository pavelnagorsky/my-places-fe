import { memo } from "react";
import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@mui/material";
import StyledTextEditorContainer from "@/components/UI/review-containers/StyledTextEditorContainer";

const ExcursionDescription = ({
  description,
  author,
}: {
  description: string;
  author: string;
}) => {
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
        <StyledTextEditorContainer
          fontSize={{ xs: "16px", md: "18px" }}
          dangerouslySetInnerHTML={createMarkup()}
        />
        <Typography fontWeight={500} fontSize={"16px"} mt={"1em"}>
          {t("excursion.author")}: {author}
        </Typography>
      </Box>
    </Stack>
  );
};

export default memo(ExcursionDescription);
