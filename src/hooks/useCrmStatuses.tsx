import { CrmStatusesEnum, ISelect } from "@/shared/interfaces";
import { Box, Stack, Typography } from "@mui/material";

const useCrmStatuses = () => {
  const statuses: ISelect[] = [
    { id: CrmStatusesEnum.PENDING, label: "Новое" },
    { id: CrmStatusesEnum.DONE, label: "Выполнено" },
    { id: CrmStatusesEnum.DECLINED, label: "Закрыто" },
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
          <Typography variant={"body1"}>Новое</Typography>
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
          <Typography variant={"body1"}>Выполнено</Typography>
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
          <Typography variant={"body1"}>Закрыто</Typography>
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
