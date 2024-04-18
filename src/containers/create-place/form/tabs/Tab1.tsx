import { Fragment, memo } from "react";
import {
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TextFieldElement } from "react-hook-form-mui";
import regExp from "@/shared/regExp";
import PublicIcon from "@mui/icons-material/Public";
import { IPlaceTabProps } from "@/containers/create-place/form/interfaces";
import { useTranslation } from "next-i18next";

const Tab1 = ({ readonly }: IPlaceTabProps) => {
  const { t } = useTranslation(["place-management", "common"]);
  return (
    <Fragment>
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
          fontWeight={{ xs: 500, md: 400 }}
          fontSize={{ xs: "20px", md: "30px" }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          {t("tabs.1.title")}
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={6000}
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
      <Typography variant={"body2"} fontSize={{ xs: "18px", md: "20px" }}>
        {t("tabs.1.description")}
      </Typography>
      <Typography
        variant={"body1"}
        mt="1em"
        fontSize={{ xs: "18px", md: "20px" }}
      >
        {t("tabs.1.placeTitle")}
      </Typography>
      <TextFieldElement
        InputProps={{
          readOnly: readonly,
        }}
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        name={"title"}
        validation={{
          required: t("errors.required", {
            ns: "common",
          }),
          maxLength: {
            value: 60,
            message: t("errors.maxLength", {
              ns: "common",
              value: 60,
            }),
          },
        }}
        placeholder={t("tabs.1.placeTitlePlaceholder")}
      />
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        {t("tabs.1.placeDescription")}
      </Typography>
      <TextFieldElement
        InputProps={{
          readOnly: readonly,
        }}
        sx={{
          mt: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        multiline
        // rows={4}
        minRows={4}
        name={"description"}
        validation={{
          required: t("errors.required", {
            ns: "common",
          }),
          maxLength: {
            value: 1000,
            message: t("errors.maxLength", {
              ns: "common",
              value: 1000,
            }),
          },
        }}
        placeholder={t("tabs.1.placeDescriptionPlaceholder")}
      />
      <Stack
        mt={"0.3em"}
        color={"secondary.main"}
        fontSize={14}
        sx={{
          fontWeight: 300,
          opacity: 0.8,
        }}
        display={"flex"}
        direction={"row"}
        alignItems={"center"}
        gap={"0.5em"}
      >
        <InfoOutlinedIcon fontSize={"small"} />
        {t("tabs.1.placeDescriptionHelper", { value: 1000 })}
      </Stack>
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        {t("tabs.1.placeWebsite")}
      </Typography>
      <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
        {t("tabs.1.placeWebsiteDescription")}
      </Typography>
      <TextFieldElement
        sx={{
          mt: "1em",
          mb: "3em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: "100%",
          fontSize: { md: "20px" },
        }}
        InputProps={{
          readOnly: readonly,
          startAdornment: (
            <InputAdornment position={"start"}>
              <PublicIcon />
            </InputAdornment>
          ),
        }}
        name={"website"}
        validation={{
          pattern: {
            value: regExp.urlPattern,
            message: t("errors.invalid", {
              ns: "common",
            }),
          },
        }}
        placeholder={"https://example.com"}
      />
    </Fragment>
  );
};

export default memo(Tab1);
