import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTranslation } from "next-i18next";

const Tab2Title = () => {
  const { t } = useTranslation(["place-management", "common"]);

  return (
    <Stack direction={"row"} gap={"0.5em"}>
      <Typography
        component={"h2"}
        fontSize={{ xs: "20px", md: "30px" }}
        fontWeight={{ xs: 500, md: 400 }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        {t("tabs.2.formTitle")}
      </Typography>
      <Tooltip
        arrow
        enterTouchDelay={0}
        leaveTouchDelay={3000}
        sx={{ fontSize: "16px", alignSelf: "center" }}
        title={<Typography p={"0.5em"}>{t("tabs.2.tooltip")}</Typography>}
      >
        <IconButton>
          <InfoOutlinedIcon fontSize={"medium"} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Tab2Title;
