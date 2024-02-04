import { PropsWithChildren, ReactNode, SyntheticEvent, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fade,
  Typography,
} from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

interface TabPanelProps {
  index: number;
  value: number;
  data: { title: string; description: ReactNode }[];
}

const TabPanel = (props: TabPanelProps) => {
  const { value, index, data } = props;
  const [expanded, setExpanded] = useState<string | false>(`panel-0`);
  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      <Fade in={index === value} unmountOnExit>
        <Box width={"100%"}>
          {data.map((d, i) => (
            <Accordion
              sx={{
                boxShadow: "none",
                border: "none",
                borderBottom: "1px solid rgb(255, 217, 182)",
                "&::before": { background: "unset" },
                py: "0.5em",
              }}
              key={i}
              expanded={expanded === `panel-${i}`}
              onChange={handleChange(`panel-${i}`)}
            >
              <AccordionSummary
                sx={{
                  "& .MuiPaper-root": { boxShadow: "none" },
                  "& .MuiAccordionSummary-content": {
                    fontWeight: 600,
                    fontSize: { xs: "20px", md: "30px" },
                  },
                }}
                expandIcon={<ExpandCircleDownOutlinedIcon color={"primary"} />}
                aria-controls={`panel-${index}-${i}-content`}
                id={`panel-${index}-${i}-header`}
              >
                {d.title}
              </AccordionSummary>
              <AccordionDetails>{d.description}</AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Fade>
    </div>
  );
};

export default TabPanel;
