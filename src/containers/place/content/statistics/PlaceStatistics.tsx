import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import { format } from "date-fns";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useTranslation } from "next-i18next";
import useLikes from "@/containers/place/content/statistics/logic/useLikes";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import useAddToFavourites from "@/containers/place/content/statistics/logic/useAddToFavourites";
import ReportButton from "@/containers/place/content/statistics/content/report/ReportButton";

interface IPlaceStatisticsProps {
  views: number;
  initialLikesCount: number;
  createdAt: string;
  placeId: number;
}

const PlaceStatistics = ({
  views,
  initialLikesCount,
  createdAt,
  placeId,
}: IPlaceStatisticsProps) => {
  const { t } = useTranslation(["place", "common"]);
  const { likesCount, isLiked, changeLike, changeLikeLoading } = useLikes({
    entityId: placeId,
    entityType: StatisticEntitiesEnum.Place,
    initialLikesCount,
  });
  const { handleAddToFavorites, addToFavouritesLoading } = useAddToFavourites({
    entityId: placeId,
    entityType: StatisticEntitiesEnum.Place,
  });
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

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
          <Typography variant={"body1"}>{views}</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={"0.2em"}>
        <Typography variant={"body1"}>
          {format(new Date(createdAt), "dd.MM.yyyy")}
        </Typography>
        {isAuth && (
          <Box>
            <Tooltip
              arrow
              enterTouchDelay={0}
              //leaveTouchDelay={6000}
              sx={{ fontSize: "14px", alignSelf: "center" }}
              title={t("favourites.tooltip")}
            >
              <IconButton
                loading={addToFavouritesLoading}
                size={"small"}
                onClick={handleAddToFavorites}
              >
                <BookmarkAddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <ReportButton
          entityType={StatisticEntitiesEnum.Place}
          entityId={placeId}
        />
      </Stack>
    </Stack>
  );
};

export default PlaceStatistics;
