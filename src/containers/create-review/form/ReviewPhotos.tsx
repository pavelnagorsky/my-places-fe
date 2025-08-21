import MyStepper from "@/components/UI/stepper/MyStepper";
import { Box, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import ImageUploader from "@/components/forms/file-uploader/FileUploader";
import { useTranslation } from "next-i18next";

const ReviewPhotos = ({
  sx,
  readonly,
  canDeleteByAPI,
}: {
  sx?: SxProps;
  readonly?: boolean;
  canDeleteByAPI?: boolean;
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
        {t("form.photosDescription", { limit: 5 })}
      </Typography>
      <Box my={"2em"}>
        <ImageUploader
          accept={"image/*"}
          readonly={readonly}
          maxLimit={5}
          fieldName={"images"}
          canDeleteByAPI={canDeleteByAPI}
        />
      </Box>
    </Box>
  );
};

export default memo(ReviewPhotos);
