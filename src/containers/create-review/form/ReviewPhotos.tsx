import MyStepper from "@/components/UI/stepper/MyStepper";
import { Box, SxProps, Typography } from "@mui/material";
import { memo } from "react";
import ImageUploader from "@/components/forms/image-uploader/ImageUploader";

const ReviewPhotos = ({
  sx,
  readonly,
}: {
  sx?: SxProps;
  readonly?: boolean;
}) => {
  return (
    <Box sx={sx}>
      <MyStepper totalOptions={3} activeOption={2} />
      <Typography
        component={"h2"}
        fontSize={{ xs: "20px", md: "30px" }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        Фотографии
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        Загрузите до 10 фотографий, сделанных на этой локации в формате jpg,
        jpeg, png.
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
