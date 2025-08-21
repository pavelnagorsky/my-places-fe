import { Box, Stack, Typography } from "@mui/material";
import { CheckboxButtonGroup, useFormContext } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";
import FileUploader from "@/components/forms/file-uploader/FileUploader";
import placeFilesService from "@/services/place-files-service/place-files.service";

const AttachmentsSelect = ({
  readonly,
  canDeleteByAPI,
}: {
  readonly?: boolean;
  canDeleteByAPI?: boolean;
}) => {
  const { t } = useTranslation(["place-management", "common"]);
  const { watch, setValue } = useFormContext<IPlaceFormContext>();
  const isCommercial = watch("isCommercial");

  if (!isCommercial) return null;
  return (
    <Stack>
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        {t("tabs.2.attachments")}
      </Typography>
      <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
        {t("tabs.2.attachmentsDescription", { limit: 5 })}
      </Typography>
      <Box mt={"2em"} mb={"3em"}>
        <FileUploader
          accept={".pdf,.doc,.docx,.txt,.rtf,.odt"}
          canDeleteByAPI={canDeleteByAPI}
          readonly={readonly}
          required
          maxLimit={5}
          fieldName={"attachments"}
          customUploadApi={placeFilesService.upload}
          customDeleteApi={placeFilesService.delete}
        />
      </Box>
    </Stack>
  );
};

export default AttachmentsSelect;
