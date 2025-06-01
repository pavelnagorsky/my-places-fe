import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import useDialog from "@/hooks/useDialog";
import { useEffect } from "react";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { routerLinks } from "@/routing/routerLinks";
import NextMuiLink from "@/components/next-mui-link/NextMuiLink";

const CookieConsent = () => {
  const { t } = useTranslation("common");
  const dialog = useDialog();

  useEffect(() => {
    dialog.handleOpen();
  }, []);

  return (
    <Drawer anchor={"bottom"} open={dialog.open} onClose={dialog.handleClose}>
      <WrappedContainer>
        <Stack
          direction={{ md: "row" }}
          gap={2}
          py={{ xs: 4, md: 4 }}
          justifyContent={{ md: "space-between" }}
          alignItems={{ md: "center" }}
        >
          <Typography maxWidth={{ md: "80%", lg: "70%" }} fontSize={"15px"}>
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
              variant={"contained"}
              sx={{
                minWidth: { md: "200px" },
                fontSize: "15px",
                py: 1.3,
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
