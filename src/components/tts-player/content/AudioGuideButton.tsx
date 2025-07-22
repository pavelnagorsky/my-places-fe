import { Button, CircularProgress, SxProps, useTheme } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectTTSPlayerAudioUrl,
  selectTTSPlayerLoading,
  selectTTSPlayerText,
} from "@/store/tts-player-slice/tts-player.selectors";
import {
  loadTTSAudioThunk,
  triggerTTSPlayerAutoPlayThunk,
} from "@/store/tts-player-slice/tts-player.thunks";
import { setTTSPlayerOpen } from "@/store/tts-player-slice/tts-player.slice";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";

interface IAudioGuideButtonProps {
  text: string;
  sx?: SxProps;
}

const AudioGuideButton = ({ text, sx }: IAudioGuideButtonProps) => {
  const { t } = useTranslation("common");
  const audioUrl = useAppSelector(selectTTSPlayerAudioUrl);
  const isLoading = useAppSelector(selectTTSPlayerLoading);
  const storedText = useAppSelector(selectTTSPlayerText);
  const dispatch = useAppDispatch();

  const handleLoadAudio = () => {
    if (!text) return;
    const onError = (err: any) => {
      dispatch(
        showAlertThunk({
          alertProps: {
            title: t("feedback.error"),
            description: t("errors.maxLength", { value: 5000 }),
            variant: "standard",
            severity: "error",
          },
          snackbarProps: {},
        })
      );
    };
    dispatch(
      loadTTSAudioThunk({ data: { text }, onSuccess: handlePlay, onError })
    );
  };

  const handlePlay = () => {
    dispatch(setTTSPlayerOpen(true));
    setTimeout(() => {
      dispatch(triggerTTSPlayerAutoPlayThunk());
    }, 100);
  };

  const handleClickPlayer = () => {
    if (isLoading) return;
    if (!!audioUrl && text === storedText) {
      handlePlay();
    } else {
      handleLoadAudio();
    }
  };

  return (
    <Button
      sx={sx}
      variant={"outlined"}
      color="primary"
      onClick={handleClickPlayer}
      disabled={!text}
      startIcon={isLoading ? <CircularProgress size={20} /> : <VolumeUpIcon />}
    >
      {t("audioGuide.button")}
    </Button>
  );
};

export default AudioGuideButton;
