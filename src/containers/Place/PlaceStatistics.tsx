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
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

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
        "&:hover": { color: "red", transform: "scale(1.05)" },
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
          "&:hover": { color: "red", transform: "scale(1.05)" },
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
      position={"relative"}
      zIndex={2}
      mt={{ md: "-2em" }}
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
          {new Date(createdAt).toDateString()}
        </Typography>
        <Box>
          <IconButton aria-label="report">
            <FlagIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PlaceStatistics;
