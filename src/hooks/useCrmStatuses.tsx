import { ISelect } from "@/shared/interfaces";
import { Box, Stack, Typography } from "@mui/material";
import { CrmStatusesEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

const useCrmStatuses = () => {
  const { t } = useTranslation("common");
  const statuses: ISelect[] = [
    { id: CrmStatusesEnum.PENDING, label: t("crmStatuses.new") },
    { id: CrmStatusesEnum.DONE, label: t("crmStatuses.done") },
    { id: CrmStatusesEnum.DECLINED, label: t("crmStatuses.declined") },
  ];

  const parseStatusColor = (status: CrmStatusesEnum) => {
    if (status === CrmStatusesEnum.PENDING) return "info.main";
    if (status === CrmStatusesEnum.DONE) return "success.main";
    return "error.main";
  };

  const colorizedStatuses = [
    {
      id: CrmStatusesEnum.PENDING,
      label: (
        <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
          <Box
            borderRadius={"50%"}
            height={"10px"}
            width={"10px"}
            bgcolor={parseStatusColor(CrmStatusesEnum.PENDING)}
          />
          <Typography variant={"body1"}>{t("crmStatuses.new")}</Typography>
        </Stack>
      ),
    },
    {
      id: CrmStatusesEnum.DONE,
      label: (
        <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
          <Box
            borderRadius={"50%"}
            height={"10px"}
            width={"10px"}
            bgcolor={parseStatusColor(CrmStatusesEnum.DONE)}
          />
          <Typography variant={"body1"}>{t("crmStatuses.done")}</Typography>
        </Stack>
      ),
    },
    {
      id: CrmStatusesEnum.DECLINED,
      label: (
        <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
          <Box
            borderRadius={"50%"}
            height={"10px"}
            width={"10px"}
            bgcolor={parseStatusColor(CrmStatusesEnum.DECLINED)}
          />
          <Typography variant={"body1"}>{t("crmStatuses.declined")}</Typography>
        </Stack>
      ),
    },
  ];

  return {
    statuses,
    parseStatusColor,
    colorizedStatuses,
  };
};

export default useCrmStatuses;
