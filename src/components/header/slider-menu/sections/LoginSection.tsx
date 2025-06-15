import { Fragment } from "react";
import { Button, Divider, Typography } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { openAuth } from "@/store/user-slice/user.slice";
import { useTranslation } from "next-i18next";
import LoginIcon from "@/components/UI/custom-icons/LoginIcon";
import SignupIcon from "@/components/UI/custom-icons/SignupIcon";

const LoginSection = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const login = () => {
    onClose();
    dispatch(openAuth({ signup: false }));
  };

  const signup = () => {
    onClose();
    dispatch(openAuth({ signup: true }));
  };

  return (
    <Fragment>
      <Divider
        variant={"middle"}
        sx={{ borderColor: "primary.main", opacity: 0.5, my: "0.3em" }}
      />
      <Button
        sx={{
          textTransform: "none",
          justifyContent: "start",
          columnGap: "0.5em",
          color: "secondary.main",
          "&:hover": {
            color: "primary.main",
          },
        }}
        onClick={login}
      >
        <LoginIcon color={"secondary"} />
        <Typography>{t("links.login")}</Typography>
      </Button>
      <Button
        sx={{
          textTransform: "none",
          justifyContent: "start",
          columnGap: "0.5em",
          color: "secondary.main",
          "&:hover": {
            color: "primary.main",
          },
        }}
        onClick={signup}
      >
        <SignupIcon color={"secondary"} />
        <Typography>{t("links.signup")}</Typography>
      </Button>
    </Fragment>
  );
};

export default LoginSection;
