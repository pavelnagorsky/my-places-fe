import { useState, useRef, useEffect, memo } from "react";
import {
  IconButton,
  Snackbar,
  Slide,
  Button,
  useTheme,
  Portal,
} from "@mui/material";
import { AudioPlayer, AudioPlayerRef } from "react-audio-play";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectTTSPlayerAudioUrl,
  selectTTSPlayerAutoPlayTrigger,
  selectTTSPlayerOpen,
} from "@/store/tts-player-slice/tts-player.selectors";
import { setTTSPlayerOpen } from "@/store/tts-player-slice/tts-player.slice";

const TTSPlayer = () => {
  const audioUrl = useAppSelector(selectTTSPlayerAudioUrl);
  const isOpen = useAppSelector(selectTTSPlayerOpen);
  const autoPlayTrigger = useAppSelector(selectTTSPlayerAutoPlayTrigger);
  const theme = useTheme();
  const audioPlayerRef = useRef<AudioPlayerRef>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!autoPlayTrigger || !audioPlayerRef.current) return;
    audioPlayerRef.current.play();
  }, [autoPlayTrigger]);

  const handleClosePlayer = () => {
    dispatch(setTTSPlayerOpen(false));
  };

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      action={
        <IconButton
          aria-label="close"
          color={"secondary"}
          onClick={handleClosePlayer}
        >
          <CloseIcon />
        </IconButton>
      }
      onClose={(event, reason) => {
        // Only allow closing via the close icon
        if (reason === "clickaway") {
          return;
        }
        handleClosePlayer();
      }}
      slots={{ transition: Slide }}
      sx={{
        "& .rap-container": {
          background: "transparent",
          boxShadow: "none",
          maxWidth: "unset",
          p: 0,
          paddingInlineStart: "1em",
        },
        "& .MuiPaper-root": {
          borderRadius: "10px",
          backgroundColor: "white",
          width: { xs: "100%", md: "600px" },
          "& .MuiSnackbarContent-message": {
            flexGrow: 1,
          },
        },
      }}
      message={
        <AudioPlayer
          onError={handleClosePlayer}
          onEnd={handleClosePlayer}
          ref={audioPlayerRef}
          src={audioUrl || ""}
          color={theme.palette.secondary.main}
          sliderColor={theme.palette.primary.main}
        />
      }
    />
  );
};

export default memo(TTSPlayer);
