import MyStepper from "@/components/UI/stepper/MyStepper";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TextFieldElement } from "react-hook-form-mui";
import { memo } from "react";
import TextEditor from "@/components/forms/text-editor/TextEditor";
import { useTranslation } from "next-i18next";

const ReviewText = ({ sx, readonly }: { sx?: SxProps; readonly?: boolean }) => {
  const { t, i18n } = useTranslation(["review-management", "common"]);
  return (
    <Box sx={sx}>
      <MyStepper totalOptions={3} activeOption={3} />
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
          fontSize={{ xs: "20px", md: "30px" }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          {t("form.reviewDescription")}
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={3000}
          sx={{ fontSize: "16px", alignSelf: "center" }}
          title={
            <Typography p={"0.5em"}>
              {t("translations.tooltip", { ns: "common" })}
            </Typography>
          }
        >
          <IconButton>
            <InfoOutlinedIcon fontSize={"medium"} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        {t("form.reviewTitle")}
      </Typography>
      <TextFieldElement
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        name={"title"}
        InputProps={{
          readOnly: readonly,
        }}
        rules={{ required: t("errors.required", { ns: "common" }) }}
        placeholder={t("form.reviewTitlePlaceholder")}
      />
      <Typography variant={"body1"} my={"1em"} fontSize={{ md: "20px" }}>
        {t("form.reviewText")}
      </Typography>
      <TextEditor
        required
        maxSymbols={6000}
        readonly={readonly}
        fieldName={"description"}
        placeholder={t("form.reviewTextPlaceholder")}
      />
    </Box>
  );
};

export default memo(ReviewText);
