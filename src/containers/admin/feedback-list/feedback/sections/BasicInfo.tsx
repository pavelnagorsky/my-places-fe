import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";
import { memo } from "react";
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import useUserTypes from "@/containers/contact-us/form/user-types/useUserTypes";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";

const BasicInfo = ({ feedback }: { feedback: IFeedback }) => {
  const userRequestTypes = useUserTypes();
  const locale = useDateFnsLocale();

  return (
    <Stack
      gap={"1em"}
      sx={{
        "& .MuiStack-root": {
          gap: {
            xs: "0.5em",
            sm: "1em",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        },
      }}
    >
      <Typography
        fontWeight={600}
        fontSize={{ xs: "22px", md: "25px" }}
        gutterBottom
      >
        Обратная связь
      </Typography>
      <Stack>
        <Typography fontWeight={600}>ID:</Typography>
        <Typography>{feedback.id}</Typography>
      </Stack>
      <Stack>
        <Typography fontWeight={600}>Почта:</Typography>
        <Typography>{feedback.email}</Typography>
      </Stack>
      <Stack>
        <Typography fontWeight={600}>Полное имя:</Typography>
        <Typography>{feedback.fullName}</Typography>
      </Stack>
      <Stack>
        <Typography fontWeight={600}>Тип пользователя:</Typography>
        <Typography>
          {userRequestTypes.find((t) => t.id === feedback.userRequestType)
            ?.label || "-"}
        </Typography>
      </Stack>
      {feedback.phone && (
        <Stack>
          <Typography fontWeight={600}>Телефон:</Typography>
          <Typography>{feedback.phone}</Typography>
        </Stack>
      )}
      <Stack>
        <Typography fontWeight={600}>Дата создания:</Typography>
        <Typography>
          {format(new Date(feedback.createdAt), "dd MMM yyyy", { locale })}
        </Typography>
      </Stack>
      <Stack
        sx={{ flexDirection: "column !important" }}
        gap={"0.5em !important"}
      >
        <Typography fontWeight={600}>Сообщение:</Typography>
        <Typography>{feedback.message}</Typography>
      </Stack>
    </Stack>
  );
};

export default memo(BasicInfo);
