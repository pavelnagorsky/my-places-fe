import { Fragment, memo } from "react";
import { Box, Typography } from "@mui/material";
import ImageUploader from "@/components/Forms/ImageUploader/ImageUploader";

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
        Загрузите до 10 фотографий, сделанных на этой локации в формате jpg,
        jpeg, png.
      </Typography>
      <Box my={"2em"}>
        <ImageUploader fieldName={"imagesIds"} />
      </Box>
    </Fragment>
  );
};

export default memo(Tab3);
