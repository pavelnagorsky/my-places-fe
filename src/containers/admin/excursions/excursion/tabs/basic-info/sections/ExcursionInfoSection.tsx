import { useTranslation } from "next-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { Box, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { routerLinks } from "@/routing/routerLinks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { memo } from "react";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import useExcursionStatuses from "@/containers/personal-area/my-excursions/logic/utils/useExcursionStatuses";
import useExcursionTypes from "@/containers/excursion-builder/content/form/logic/utils/useExcursionTypes";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";
import utils from "@/shared/utils";
import I18nLanguages from "@/shared/I18nLanguages";

const ExcursionInfoSection = ({ item }: { item: IExcursion }) => {
  const { t, i18n } = useTranslation();
  const locale = useDateFnsLocale();
  const statuses = useExcursionStatuses();
  const types = useExcursionTypes();
  const travelModes = useTravelModeOptions();

  const status = statuses.find((s) => s.id === item.status);

  const formattedDistance = utils.formatKM(item.distance, I18nLanguages.ru);
  const formattedDuration = utils.formatMinutes(item.duration, {
    hoursTranslation: t("hours"),
    minutesTranslation: t("minutes"),
  });
  const formattedStayDuration = utils.formatMinutes(item.excursionDuration, {
    hoursTranslation: t("hours"),
    minutesTranslation: t("minutes"),
  });

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
          Информация об экскурсии
        </Typography>
        <Stack>
          <Typography fontWeight={600}>ID:</Typography>
          <Typography>{item.id}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Название:</Typography>
          <Typography>{item.title}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Автор:</Typography>
          <Typography>{item.authorName || "-"}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Ссылка:</Typography>
          <Typography
            component={Link}
            href={routerLinks.excursion(item.slug)}
            color={"secondary.main"}
            sx={{
              textDecoration: "underline #565656",
              wordBreak: "break-word",
            }}
            target={"_blank"}
          >
            {item.slug}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Область:</Typography>
          <Typography>{item.region?.title || "Вся Беларусь"}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Город:</Typography>
          <Typography>{item.city?.title || "-"}</Typography>
        </Stack>
        <Stack>
          <Tooltip
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={3000}
            title={
              <Typography
                p={"0.5em"}
                fontSize={"14px"}
                display={"flex"}
                flexDirection={"column"}
                gap={"0.5em"}
              >
                {item.places.map((p) => (
                  <span key={p.id}>
                    {p.title}
                    <br />
                  </span>
                ))}
              </Typography>
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              width={"fit-content"}
              gap={"0.5em"}
              sx={{ cursor: "pointer" }}
            >
              <Typography fontWeight={600}>
                Мест: {item.places.length || 0}
              </Typography>
              <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
            </Stack>
          </Tooltip>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Тип:</Typography>
          <Typography>
            {types.find((type) => type.id === item.type)?.label || "-"}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Категория:</Typography>
          <Typography>
            {travelModes.find((mode) => mode.id === item.travelMode)?.label ||
              "-"}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Статус:</Typography>
          <Tooltip
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={3000}
            title={
              !!item.moderationMessage ? (
                <Typography p={"0.5em"} fontSize={"14px"}>
                  {item.moderationMessage}
                </Typography>
              ) : null
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={"0.5em"}
              sx={{
                cursor: !!item.moderationMessage ? "pointer" : undefined,
              }}
            >
              <Box
                borderRadius={"50%"}
                height={"10px"}
                width={"10px"}
                bgcolor={status?.color}
              />
              <Typography variant={"body1"}>{status?.label}</Typography>
              {!!item.moderationMessage && (
                <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
              )}
            </Stack>
          </Tooltip>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Дата создания:</Typography>
          <Typography>
            {format(new Date(item.createdAt), "dd MMM yyyy", { locale })}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Дата обновления:</Typography>
          <Typography>
            {format(new Date(item.updatedAt), "dd MMM yyyy", { locale })}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Количество лайков:</Typography>
          <Typography>{item.likesCount}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Количество просмотров:</Typography>
          <Typography>{item.viewsCount}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Расстояние:</Typography>
          <Typography>{formattedDistance}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Время в пути:</Typography>
          <Typography>{formattedDuration}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Время на осмотр:</Typography>
          <Typography>{formattedStayDuration}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default memo(ExcursionInfoSection);
