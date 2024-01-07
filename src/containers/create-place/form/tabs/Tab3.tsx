import { Fragment, memo } from "react";
import { Box, Typography } from "@mui/material";
import ImageUploader from "@/components/forms/image-uploader/ImageUploader";

const Tab3 = () => {
  return (
    <Fragment>
      <Typography
        component={"h2"}
        fontSize={{ xs: "20px", md: "30px" }}
        fontWeight={{ xs: 500, md: 400 }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        Фотографии
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        Загрузите до 5 фотографий, сделанных на этой локации в формате jpg,
        jpeg, png.
      </Typography>
      <Box mt={"2em"} mb={"3em"}>
        <ImageUploader required maxLimit={5} fieldName={"images"} />
      </Box>
    </Fragment>
  );
};

export default memo(Tab3);
