import { useTranslation } from "next-i18next";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { format } from "date-fns";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useLikes from "@/containers/place/content/statistics/logic/useLikes";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import ReportButton from "@/containers/place/content/statistics/content/report/ReportButton";

interface IExcursionStatisticsProps {
  excursion: IExcursion;
}

const ExcursionStatistics = ({ excursion }: IExcursionStatisticsProps) => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const { likesCount, isLiked, changeLike, changeLikeLoading } = useLikes({
    entityId: excursion.id,
    entityType: StatisticEntitiesEnum.Excursion,
    initialLikesCount: excursion.likesCount,
  });

  const onAuth = () => {
    dispatch(openAuth({}));
  };

  const likeButton = (
    <IconButton
      disabled={changeLikeLoading}
      onClick={isAuth ? changeLike : onAuth}
      sx={({ transitions }) => ({
        color: isLiked ? "red" : "secondary.main",
        "&.Mui-disabled": { color: isLiked ? "red" : "secondary.main" },
        "&:hover": { color: "red", transform: "scale(1.1)" },
        transition: transitions.create(["color", "transform"], {
          duration: transitions.duration.short,
        }),
      })}
    >
      {isLiked ? (
        <FavoriteIcon aria-label="remove-like" />
      ) : (
        <FavoriteBorderIcon aria-label="like" />
      )}
    </IconButton>
  );

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
        <Stack direction={"row"} alignItems={"center"} gap={"0.1em"}>
          {likeButton}
          <Typography variant={"body1"}>{likesCount}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={"0.6em"}>
          <RemoveRedEyeOutlinedIcon color={"action"} />
          <Typography variant={"body1"}>{excursion.viewsCount}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={"0.2em"}>
        <Typography variant={"body1"}>
          {format(new Date(excursion.createdAt), "dd.MM.yyyy")}
        </Typography>
        <ReportButton
          entityType={StatisticEntitiesEnum.Excursion}
          entityId={excursion.id}
        />
      </Stack>
    </Stack>
  );
};

export default ExcursionStatistics;
