import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import TabPanel from "@/containers/about-us/faq/TabPanel";

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
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack
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
          FAQ
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
          <Tab label="Места" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
        </Tabs>
      </Stack>
      <Box width={"100%"}>
        <TabPanel
          value={value}
          index={0}
          data={[
            {
              title: "Создание места",
              description: (
                <Typography
                  color={"secondary.main"}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              ),
            },
            {
              title: "Модерация",
              description: (
                <Typography
                  color={"secondary.main"}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              ),
            },
            {
              title: "Оплата",
              description: (
                <Typography
                  color={"secondary.main"}
                  fontSize={{ xs: "16px", md: "20px" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              ),
            },
          ]}
        />
      </Box>
    </Stack>
  );
};

export default Faq;
