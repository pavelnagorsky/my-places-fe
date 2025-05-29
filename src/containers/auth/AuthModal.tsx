import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import Slide from "@mui/material/Slide/Slide";
import { TransitionProps } from "@mui/material/transitions/transition";
import { forwardRef, ReactElement, Ref, SyntheticEvent, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TabPanel from "@/containers/auth/content/tabs/TabPannel";
import Login from "@/containers/auth/content/tabs/Login";
import CloseIcon from "@mui/icons-material/Close";
import Signup from "@/containers/auth/content/tabs/Signup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ActiveAuthScreenEnum,
  changeAuthScreen,
  closeAuth,
  selectAuthActiveScreen,
  selectAuthCloseRedirect,
  selectAuthOpen,
  selectOAuthLoading,
} from "@/store/user-slice/user.slice";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import OAuthSection from "@/containers/auth/content/oauth/OAuthSection";
import BackdropLoader from "@/components/UI/loader/BackdropLoader";
import ForgotPassword from "@/containers/auth/content/forgot-password/ForgotPassword";

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    "aria-controls": `auth-tabpanel-${index}`,
    sx: {
      fontSize: { xs: "16px", md: "18px" },
      color: "secondary.main",
      fontWeight: 600,
    },
  };
}

const scrollbarSx: SxProps = {
  scrollbarWidth: "thin !important",
  scrollbarColor: "#aeaeaeb8 rgba(0, 0, 0, 0.05)",
  "&::-webkit-scrollbar-track": {
    background: "rgba(0, 0, 0, 0.1);",
  },
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  /* Handle */
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
  },

  /* Handle on hover */
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AuthModal = () => {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const open = useAppSelector(selectAuthOpen);
  const oauthLoading = useAppSelector(selectOAuthLoading);
  const activeTab = useAppSelector(selectAuthActiveScreen);
  const redirectHomeOnClose = useAppSelector(selectAuthCloseRedirect);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClose = () => {
    if (redirectHomeOnClose) {
      router.push("/");
    }
    dispatch(closeAuth());
  };

  const handleChangeTab = (
    event: SyntheticEvent,
    newValue: ActiveAuthScreenEnum
  ) => {
    dispatch(changeAuthScreen(newValue));
  };

  return (
    <div>
      <Dialog
        scroll={"paper"}
        open={open}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            px: { sm: "2em" },
            pb: { sm: "2em" },
            minWidth: { sm: "520px" },
            maxWidth: { sm: "520px" },
            borderRadius: { sm: "15px" },
            backdropFilter: "blur(15px)",
            boxShadow:
              "5px 5px 4px 0px rgba(255, 255, 255, 0.10) inset, -5px -5px 4px 0px rgba(255, 255, 255, 0.10) inset, 20px 30px 100px 0px rgba(0, 0, 0, 0.05)",
            background:
              "linear-gradient(135deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%, rgba(255, 255, 255, 0.20) 100%)",
          },
        }}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <BackdropLoader
          loading={oauthLoading}
          sx={{ background: "RGBA(255, 255, 255, 0.7)" }}
        />
        <Stack
          direction={"row"}
          mt={{ xs: "0.5em", sm: "1.5em" }}
          mb={{ xs: "0.5em", sm: "0.5em" }}
          mr={{ xs: "1.5em", sm: "-0.5em" }}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <IconButton
            size={"small"}
            onClick={handleClose}
            sx={{ background: "RGBA(255, 255, 255, 0.47)" }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent
          sx={{
            pt: 0,
            ...scrollbarSx,
          }}
        >
          <Box sx={{ width: "100%", mb: "2em" }}>
            <Tabs
              value={activeTab}
              onChange={handleChangeTab}
              aria-label="auth tabs"
              orientation={"horizontal"}
              sx={{
                width: "fit-content",
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tab label={t("auth.login.title")} {...a11yProps(0)} />
              <Tab label={t("auth.signup.title")} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box>
            <TabPanel value={activeTab} index={0}>
              <Login />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Signup />
            </TabPanel>
          </Box>
          <Stack gap={3}>
            <OAuthSection />
            {activeTab === ActiveAuthScreenEnum.LOGIN && <ForgotPassword />}
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModal;
