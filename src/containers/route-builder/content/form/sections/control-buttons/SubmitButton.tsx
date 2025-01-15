import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  saveRouteThunk,
  selectHasItems,
  selectSubmitLoading,
} from "@/store/route-builder-slice/route-builder.slice";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSubmitLoading);
  const hasItems = useAppSelector(selectHasItems);
  const isAuth = useAppSelector(selectIsAuth);
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<IRouteBuilderForm>();

  const onSubmit = () => {
    if (loading) return;

    if (!isAuth) {
      dispatch(openAuth({}));
      return;
    }

    handleSubmit((data) => {
      dispatch(
        saveRouteThunk({
          coordinatesStart: data.searchFrom.coordinates as string,
          coordinatesEnd: data.searchTo.coordinates as string,
          title: data.title,
        })
      );
    })();
  };

  return (
    <Button
      disabled={!isValid || !hasItems}
      variant={"contained"}
      size={"large"}
      endIcon={loading && <CircularProgress color="inherit" size={22} />}
      onClick={onSubmit}
    >
      Сохранить маршрут
    </Button>
  );
};

export default SubmitButton;
