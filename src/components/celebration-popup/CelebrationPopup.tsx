import { useTranslation } from "next-i18next";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grow,
  IconButton,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MuiImage } from "@/components/UI/mui-image/MuiImage";
import celebrationImage from "/public/images/celebration/celebration.png";
import celebrationBackgroundImage from "/public/images/celebration/celebration-background.png";
import { useRouter } from "next/router";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { routerLinks } from "@/routing/routerLinks";
import localStorageFields from "@/shared/localStorageFields";
import { TransitionProps } from "@mui/material/transitions/transition";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CelebrationPopup = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const popupDate = "11-18-2028";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasViewed = !!localStorage.getItem(
      localStorageFields.newsPopup(popupDate)
    );
    if (!hasViewed) setOpen(true);
  }, []);

  const onClose = () => {
    localStorage.setItem(localStorageFields.newsPopup(popupDate), "true");
    setOpen(false);
  };

  const onClickDonation = () => {
    onClose();
    router.push(routerLinks.aboutUs + "#donation");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: isMobile ? 0 : "24px",
            p: "1.9em",
            backgroundImage: `url(${celebrationBackgroundImage.src})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        color={"secondary"}
        sx={{
          position: { xs: "fixed", sm: "absolute" },
          zIndex: 1,
          top: "0.5em",
          right: "0.5em",
        }}
      >
        <CloseIcon fontSize={"large"} />
      </IconButton>
      <Stack alignItems={"center"} gap={4}>
        <Stack>
          <MuiImage
            imageProps={{
              src: celebrationImage,
              width: 210,
              height: 203,
              alt: "celebration",
            }}
            boxProps={{
              sx: {
                "& img": {
                  objectFit: "cover",
                },
              },
            }}
          />
        </Stack>
        <Stack textAlign="center" gap={1}>
          <Typography
            fontWeight={600}
            fontSize={"15px"}
            color={"primary"}
            textTransform={"uppercase"}
          >
            Дорогие друзья!
          </Typography>
          <Typography fontWeight={600} fontSize={"38px"}>
            У нас праздник!
          </Typography>
          <Typography
            fontWeight={500}
            fontSize={"18px"}
            sx={{
              "& span": {
                color: "primary.main",
              },
            }}
          >
            Для нашего сообщества наступил знаковый момент:{" "}
            <Box component={"span"}>тысячный участник</Box> пополнил наши ряды,
            а статистика просмотров достигла цифры в{" "}
            <Box component={"span"}>500 000</Box>.
          </Typography>
          <Divider sx={{ mx: "20%", borderColor: "primary.main", my: "1em" }} />
          <Typography fontWeight={500} fontSize={"18px"}>
            Ждём ваши находки — новые Места, яркие Заметки и уникальные
            Экскурсии. Делитесь эмоциями!
          </Typography>
          <Typography fontWeight={500} fontSize={"18px"}>
            Также мы будем благодарны за материальную поддержку в развитии
            проекта.
          </Typography>
        </Stack>
        <Box>
          <Button
            onClick={onClickDonation}
            size={"large"}
            variant={"contained"}
            sx={{ borderRadius: "100px", fontWeight: 600 }}
          >
            Поддержать проект
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default CelebrationPopup;
