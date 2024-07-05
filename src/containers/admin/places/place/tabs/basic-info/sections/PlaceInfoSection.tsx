import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { useTranslation } from "next-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { Box, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { routerLinks } from "@/routing/routerLinks";
import usePlaceStatuses from "@/hooks/usePlaceStatuses";
import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { memo } from "react";

const PlaceInfoSection = ({ place }: { place: IMyPlace }) => {
  const { t } = useTranslation();
  const locale = useDateFnsLocale();
  const placeStatuses = usePlaceStatuses();
  const parseStatusColor = (status: PlaceStatusesEnum) => {
    if (
      status === PlaceStatusesEnum.MODERATION ||
      status === PlaceStatusesEnum.NEEDS_PAYMENT
    )
      return "warning.main";
    if (status === PlaceStatusesEnum.APPROVED) return "success.main";
    return "error.main";
  };
  const parseTooltipText = (): string | null => {
    if (place.status === PlaceStatusesEnum.REJECTED)
      return place.moderationMessage;
    if (place.status === PlaceStatusesEnum.NEEDS_PAYMENT)
      return "Cогласно правилам данного сайта, созданное Вами Место признано коммерческим, поэтому для его публикации необходимо провести оплату, согласно тарифу на рекламные услуги.";
    if (place.status === PlaceStatusesEnum.COMMERCIAL_EXPIRED)
      return "Срок действия рекламы созданного Вами коммерческого Места истек. Для возобновления публикации на сайте, необходимо провести оплату, согласно тарифу на рекламные услуги.";
    return null;
  };
  const tooltipText = parseTooltipText();

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
          Информация о месте
        </Typography>
        <Stack>
          <Typography fontWeight={600}>ID:</Typography>
          <Typography>{place.id}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Название:</Typography>
          <Typography>{place.title}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Автор:</Typography>
          <Typography>{place.author || "-"}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Ссылка:</Typography>
          <Typography
            component={Link}
            href={routerLinks.place(place.slug)}
            color={"secondary.main"}
            sx={{
              textDecoration: "underline #565656",
              wordBreak: "break-word",
            }}
            target={"_blank"}
          >
            {place.slug}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Тип:</Typography>
          <Typography>{place.type}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Коммерция:</Typography>
          <Stack direction={"row"} gap={"0.5em"}>
            <Typography variant={"body1"}>
              {place.advertisement ? "Да" : "Нет"}
            </Typography>
            {!!place.advEndDate && (
              <Typography variant={"body1"}>
                (
                {format(new Date(place.advEndDate), "dd MMM yyyy", {
                  locale,
                })}
                )
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Статус:</Typography>
          <Tooltip
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={3000}
            title={
              tooltipText ? (
                <Typography p={"0.5em"} fontSize={"14px"}>
                  {tooltipText}
                </Typography>
              ) : null
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={"0.5em"}
              sx={{
                cursor: tooltipText ? "pointer" : undefined,
              }}
            >
              <Box
                borderRadius={"50%"}
                height={"10px"}
                width={"10px"}
                bgcolor={parseStatusColor(place.status)}
              />
              <Typography variant={"body1"}>
                {placeStatuses.find((s) => s.id === place.status)?.label}
              </Typography>
              {tooltipText && (
                <InfoOutlinedIcon color={"secondary"} fontSize={"small"} />
              )}
            </Stack>
          </Tooltip>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Дата создания:</Typography>
          <Typography>
            {format(new Date(place.createdAt), "dd MMM yyyy", { locale })}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Дата обновления:</Typography>
          <Typography>
            {format(new Date(place.updatedAt), "dd MMM yyyy", { locale })}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Количество заметок:</Typography>
          <Typography>{place.reviewsCount}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Количество просмотров:</Typography>
          <Typography>{place.viewsCount}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Количество лайков:</Typography>
          <Typography>{place.likesCount}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={600}>Количество комментариев:</Typography>
          <Typography>{place.commentsCount}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default memo(PlaceInfoSection);
