import { Trans, useTranslation } from "next-i18next";
import {
  Box,
  Button,
  Dialog,
  Divider,
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
import React, {
  forwardRef,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from "react";
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
            // p: "1.9em",
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
      <Stack alignItems={"center"} gap={4} p={"1.9em"} pb={0}>
        <Stack>
          <MuiImage
            imageProps={{
              src: celebrationImage,
              width: 210,
              height: 203,
              alt: t("celebrationPopup.altText"),
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
            {t("celebrationPopup.title")}
          </Typography>
          <Typography fontWeight={600} fontSize={"38px"}>
            {t("celebrationPopup.subtitle")}
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
            <Trans
              i18nKey="celebrationPopup.message"
              components={{
                1: <Box component="span" />,
              }}
            />
          </Typography>
          <Divider sx={{ mx: "20%", borderColor: "primary.main", my: "1em" }} />
          <Typography fontWeight={500} fontSize={"18px"}>
            {t("celebrationPopup.callToAction1")}
          </Typography>
          <Typography fontWeight={500} fontSize={"18px"}>
            {t("celebrationPopup.callToAction2")}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        py={"1.9em"}
        width={"100%"}
        position={"sticky"}
        zIndex={1}
        bgcolor={"background.paper"}
        bottom={0}
        alignItems={"center"}
      >
        <Box>
          <Button
            onClick={onClickDonation}
            size={"large"}
            variant={"contained"}
            sx={{ borderRadius: "100px", fontWeight: 600 }}
          >
            {t("celebrationPopup.supportButton")}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default CelebrationPopup;
