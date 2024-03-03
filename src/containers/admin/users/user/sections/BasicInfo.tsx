import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { memo } from "react";

const BasicInfo = ({ user }: { user: IUserShortInfo }) => {
  return (
    <Stack gap={"1em"}>
      <Typography
        fontWeight={600}
        fontSize={{ xs: "22px", md: "25px" }}
        gutterBottom
      >
        Данные пользователя
      </Typography>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>ID:</Typography>
        <Typography>{user.id}</Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Почта:</Typography>
        <Typography>{user.email}</Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Имя:</Typography>
        <Typography>{user.firstName}</Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Фамилия:</Typography>
        <Typography>{user.lastName}</Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Язык:</Typography>
        <Typography>{user.language || "-"}</Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Почта подтверждена:</Typography>
        <Typography>{user.isEmailConfirmed ? "Да" : "Нет"}</Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Дата регистрации:</Typography>
        <Typography>
          {format(new Date(user.createdAt), "dd MM yyyy")}
        </Typography>
      </Stack>
      <Stack direction={"row"} gap={"1em"}>
        <Typography fontWeight={600}>Блокировка:</Typography>
        <Typography>
          {user.blockedUntil
            ? `До ${format(new Date(user.blockedUntil), "dd MM yyyy")}`
            : "Нет"}
        </Typography>
      </Stack>
      {user.blockReason && (
        <Stack direction={"row"} gap={"1em"}>
          <Typography fontWeight={600}>Причина блокировки:</Typography>{" "}
          <Typography>{user.blockReason}</Typography>{" "}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(BasicInfo);
