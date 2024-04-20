import { Fragment, memo } from "react";
import { Box, Typography } from "@mui/material";
import ImageUploader from "@/components/forms/image-uploader/ImageUploader";
import { IPlaceTabProps } from "@/containers/create-place/form/interfaces";
import { useTranslation } from "next-i18next";

const Tab3 = ({
  readonly,
  canDeleteByAPI,
}: IPlaceTabProps & { canDeleteByAPI?: boolean }) => {
  const { t } = useTranslation("place-management");

  return (
    <Fragment>
      <Typography
        component={"h2"}
        fontSize={{ xs: "20px", md: "30px" }}
        fontWeight={{ xs: 500, md: 400 }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        {t("tabs.3.title")}
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        {t("tabs.3.description", { limit: 5 })}
      </Typography>
      <Box mt={"2em"} mb={"3em"}>
        <ImageUploader
          canDeleteByAPI={canDeleteByAPI}
          readonly={readonly}
          required
          maxLimit={5}
          fieldName={"images"}
        />
      </Box>
    </Fragment>
  );
};

export default memo(Tab3);
