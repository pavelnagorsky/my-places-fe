import { useTranslation } from "next-i18next";
import { Stack, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { format } from "date-fns";

interface IExcursionStatisticsProps {
  views: number;
  createdAt: string;
}

const ExcursionStatistics = ({
  views,
  createdAt,
}: IExcursionStatisticsProps) => {
  const { t } = useTranslation(["excursion-management", "common"]);

  return (
    <Stack
      mt={"0.5em"}
      position={"relative"}
      zIndex={2}
      sx={{
        "& p": {
          fontSize: { xs: "15px", md: "20px" },
          fontWeight: 300,
        },
        "& svg": {
          width: {
            xs: "1.1em",
            md: "1.2em",
          },
          height: {
            xs: "1.1em",
            md: "1.2em",
          },
        },
      }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={{ xs: "1em", md: "1.5em" }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={"0.6em"}>
          <RemoveRedEyeOutlinedIcon color={"action"} />
          <Typography variant={"body1"}>{views}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={"0.2em"}>
        <Typography variant={"body1"}>
          {format(new Date(createdAt), "dd.MM.yyyy")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ExcursionStatistics;
