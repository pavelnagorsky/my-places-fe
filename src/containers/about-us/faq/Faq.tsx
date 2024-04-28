import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SyntheticEvent, useMemo, useState } from "react";
import TabPanel from "@/containers/about-us/faq/TabPanel";
import { useTranslation } from "next-i18next";
import regExp from "@/shared/regExp";

function a11yProps(index: number) {
  return {
    sx: {
      fontSize: { xs: "14px", md: "20px" },
      fontWeight: { xs: 600, md: 300 },
    },
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const Faq = () => {
  const { t, i18n } = useTranslation("about");
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const data = [
    {
      title: t("faq.1.title"),
      questions: [
        { title: t("faq.1.1.title"), description: t("faq.1.1.description") },
        { title: t("faq.1.2.title"), description: t("faq.1.2.description") },
        { title: t("faq.1.3.title"), description: t("faq.1.3.description") },
        { title: t("faq.1.4.title"), description: t("faq.1.4.description") },
      ],
    },
    {
      title: t("faq.2.title"),
      questions: [
        { title: t("faq.2.1.title"), description: t("faq.2.1.description") },
        { title: t("faq.2.2.title"), description: t("faq.2.2.description") },
      ],
    },
    {
      title: t("faq.3.title"),
      questions: [
        { title: t("faq.3.1.title"), description: t("faq.3.1.description") },
        { title: t("faq.3.2.title"), description: t("faq.3.2.description") },
        { title: t("faq.3.3.title"), description: t("faq.3.3.description") },
      ],
    },
    {
      title: t("faq.4.title"),
      questions: [
        { title: t("faq.4.1.title"), description: t("faq.4.1.description") },
      ],
    },
  ];

  return (
    <Stack
      id={"faq"}
      mt={{ xs: "2em", md: "4em" }}
      mb={"2em"}
      direction={{ md: "row" }}
      columnGap={"3em"}
      rowGap={"1em"}
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Stack>
        <Typography
          component={"h2"}
          fontWeight={600}
          fontSize={{ xs: "30px", md: "35px" }}
          mb={{ xs: "0.5em", md: "0.8em" }}
        >
          {t("faq.title")}
        </Typography>
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          value={value}
          scrollButtons={isMobile ? "auto" : false}
          variant={isMobile ? "scrollable" : "standard"}
          onChange={handleChange}
          aria-label="FAQ"
          sx={
            isMobile
              ? {}
              : {
                  borderLeft: 1,
                  borderColor: "divider",
                  "& button": {
                    alignItems: "start",
                    textTransform: "none",
                    textAlign: "start",
                    width: "200px",
                  },
                  "& .MuiTabs-indicator": {
                    right: "unset",
                    left: 0,
                  },
                }
          }
        >
          {data.map((section, i) => (
            <Tab key={i} label={section.title} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Stack>
      <Box width={"100%"}>
        {data.map((section, i) => (
          <TabPanel
            key={i}
            value={value}
            index={i}
            data={section.questions.map((question) => ({
              title: question.title,
              description: (
                <Typography
                  color={"secondary.main"}
                  fontSize={{ xs: "16px", md: "20px" }}
                  dangerouslySetInnerHTML={{
                    __html: question.description.replace(
                      regExp.brReplacement,
                      "<br>"
                    ),
                  }}
                />
              ),
            }))}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default Faq;
