import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import { Paper, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { memo } from "react";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";

const BasicInfo = ({ user }: { user: IUserShortInfo }) => {
  const locale = useDateFnsLocale();

  const getUserRegistrationSource = () => {
    if (user.googleUserId) return "Google OAuth";
    if (user.yandexUserId) return "Yandex OAuth";
    if (user.vkUserId) return "VK OAuth";
    return "Классический";
  };
  const registrationSource = getUserRegistrationSource();

  return (
    <Paper
      sx={{
        p: "1em",
        borderRadius: "10px",
      }}
    >
      <Stack
        gap={"1em"}
        sx={{
          "& > .MuiStack-root": {
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
          Данные пользователя
        </Typography>
        <Stack>
          <Typography fontWeight={600}>ID:</Typography>
          <Typography>{user.id}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Почта:</Typography>
          <Typography>{user.email}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Метод регистрации:</Typography>
          <Typography>{registrationSource}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Имя:</Typography>
          <Typography>{user.firstName}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Фамилия:</Typography>
          <Typography>{user.lastName}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Язык:</Typography>
          <Typography>{user.language || "-"}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Почта подтверждена:</Typography>
          <Typography>{user.isEmailConfirmed ? "Да" : "Нет"}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Дата регистрации:</Typography>
          <Typography>
            {format(new Date(user.createdAt), "dd MMM yyyy", { locale })}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Блокировка:</Typography>
          <Typography>
            {user.blockedUntil
              ? `До ${format(new Date(user.blockedUntil), "dd MMM yyyy", {
                  locale,
                })}`
              : "Нет"}
          </Typography>
        </Stack>
        {user.blockReason && (
          <Stack>
            <Typography fontWeight={600}>Причина блокировки:</Typography>{" "}
            <Typography>{user.blockReason}</Typography>{" "}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default memo(BasicInfo);
