import { Fragment } from "react";
import { Button, Divider, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useAppDispatch } from "@/store/hooks";
import { openAuth } from "@/store/user-slice/user.slice";

const LoginSection = ({ onClose }: { onClose: () => void }) => {
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
        <LoginIcon fontSize={"small"} color={"secondary"} />
        <Typography>Войти</Typography>
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
        <PersonAddAlt1Icon fontSize={"small"} color={"secondary"} />
        <Typography>Зарегистрироваться</Typography>
      </Button>
    </Fragment>
  );
};

export default LoginSection;
