import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import likesService from "@/services/likes-service/likes.service";
import { format } from "date-fns";
import usePopover from "@/hooks/usePopover";
import ReportForm from "@/containers/place/report/ReportForm";
import placesService from "@/services/places-service/places.service";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

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
  const reportPopover = usePopover("report-form");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const handleAddPlaceToFavorites = () => {
    if (!isAuth) return;
    placesService
      .addPlaceToFavourites(placeId)
      .then(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Успех!",
              description: "Место была успешно добавлено в избранное.",
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      })
      .catch(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description: "Место уже добавлено в избранное.",
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  useEffect(() => {
    if (!isAuth) {
      setIsLiked(false);
      return;
    }
    likesService
      .checkPlaceLikeExists(placeId)
      .then(({ data }) => {
        if (data.isLiked) {
          setIsLiked(true);
        }
      })
      .catch(() => {});
  }, [placeId, isAuth]);

  const onAuth = () => {
    dispatch(openAuth({}));
  };

  const changeLike = () => {
    const wasLiked = isLiked;
    likesService
      .changePlaceLike(placeId)
      .then(() => {
        setIsLiked(!isLiked);
        if (wasLiked) {
          setLikesCount(likesCount - 1);
        } else {
          setLikesCount(likesCount + 1);
        }
      })
      .catch(() => {});
  };

  const likeButton = isAuth ? (
    <IconButton
      onClick={changeLike}
      sx={({ transitions }) => ({
        color: isLiked ? "red" : "secondary.main",
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
  ) : (
    <Tooltip
      arrow
      enterTouchDelay={0}
      title={
        <Stack p={"0.5em"}>
          <Typography mb={"1em"} variant={"body1"}>
            Только авторизированные пользователи могут ставить лайк
          </Typography>
          <Button onClick={onAuth} variant={"contained"}>
            Авторизироваться
          </Button>
        </Stack>
      }
    >
      <IconButton
        onClick={onAuth}
        sx={({ transitions }) => ({
          color: "secondary.main",
          "&:hover": { color: "red", transform: "scale(1.1)" },
          transition: transitions.create(["color", "transform"], {
            duration: transitions.duration.short,
          }),
        })}
      >
        <FavoriteBorderIcon aria-label="like" />
      </IconButton>
    </Tooltip>
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
              leaveTouchDelay={6000}
              sx={{ fontSize: "14px", alignSelf: "center" }}
              title={"Сохранить в избранное"}
            >
              <IconButton size={"small"} onClick={handleAddPlaceToFavorites}>
                <BookmarkAddIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box>
          <Tooltip
            arrow
            enterTouchDelay={0}
            leaveTouchDelay={6000}
            sx={{ fontSize: "16px", alignSelf: "center" }}
            title={"Пожаловаться"}
          >
            <IconButton
              aria-label="report-form"
              size={"small"}
              onClick={reportPopover.handleOpen}
            >
              <FlagIcon />
            </IconButton>
          </Tooltip>
          <ReportForm
            open={reportPopover.open}
            id={reportPopover.id}
            onClose={reportPopover.handleClose}
            anchorEl={reportPopover.anchor}
            placeId={placeId}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default PlaceStatistics;
