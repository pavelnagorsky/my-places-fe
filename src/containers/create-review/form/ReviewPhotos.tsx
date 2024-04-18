import MyStepper from "@/components/UI/stepper/MyStepper";
import { Box, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import ImageUploader from "@/components/forms/image-uploader/ImageUploader";
import { useTranslation } from "next-i18next";

const ReviewPhotos = ({
  sx,
  readonly,
}: {
  sx?: SxProps;
  readonly?: boolean;
}) => {
  const { t } = useTranslation("review-management");
  return (
    <Box sx={sx}>
      <MyStepper totalOptions={3} activeOption={2} />
      <Typography
        component={"h2"}
        fontSize={{ xs: "20px", md: "30px" }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        {t("form.photos")}
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        {t("form.photosDescription", { limit: 10 })}
      </Typography>
      <Box my={"2em"}>
        <ImageUploader
          readonly={readonly}
          required
          maxLimit={10}
          fieldName={"images"}
        />
      </Box>
    </Box>
  );
};

export default memo(ReviewPhotos);
