import {
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import useDialog from "@/hooks/useDialog";
import { useEffect } from "react";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { routerLinks } from "@/routing/routerLinks";
import NextMuiLink from "@/components/next-mui-link/NextMuiLink";
import localStorageFields from "@/shared/localStorageFields";
import { useRouter } from "next/router";

const CookieConsent = () => {
  const { t } = useTranslation("common");
  const dialog = useDialog();
  const router = useRouter();

  const isScrolled = useScrollTrigger({
    threshold: 40, // Adjust based on image height
    disableHysteresis: true,
  });

  useEffect(() => {
    if (!router.isReady || !isScrolled) return;
    const isPrivacyPolicyPage = router.asPath === routerLinks.privacyPolicy;
    const isConfirmed =
      localStorage.getItem(localStorageFields.COOKIE_CONFIRM) === "true";
    if (isConfirmed || isPrivacyPolicyPage) return;
    setTimeout(dialog.handleOpen, 500);
  }, [router.isReady, isScrolled]);

  const onConfirm = () => {
    dialog.handleClose();
    localStorage.setItem(localStorageFields.COOKIE_CONFIRM, "true");
  };

  return (
    <Drawer
      transitionDuration={300}
      anchor={"bottom"}
      disableScrollLock
      open={dialog.open}
      hideBackdrop
      onClose={dialog.handleClose}
    >
      <WrappedContainer>
        <Stack
          direction={{ md: "row" }}
          gap={2}
          py={{ xs: 2, md: 4 }}
          justifyContent={{ md: "space-between" }}
          alignItems={{ md: "center" }}
        >
          <Typography
            maxWidth={{ md: "80%", lg: "70%" }}
            fontSize={{ xs: "14px", md: "15px" }}
          >
            {t("cookieConsent")}{" "}
            <NextMuiLink
              href={routerLinks.privacyPolicy}
              sx={{
                fontWeight: 500,
                fontSize: "15px",
                color: "secondary.dark",
                textDecoration: "underline",
              }}
              target={"_blank"}
            >
              {t("cookieConsentPrivacyPolicy")}
            </NextMuiLink>
          </Typography>
          <Box>
            <Button
              onClick={onConfirm}
              variant={"contained"}
              sx={{
                minWidth: { xs: "150px", md: "200px" },
                fontSize: "15px",
                py: 1.3,
                bgcolor: "primary.light",
              }}
            >
              {t("buttons.accept")}
            </Button>
          </Box>
        </Stack>
      </WrappedContainer>
    </Drawer>
  );
};

export default CookieConsent;
