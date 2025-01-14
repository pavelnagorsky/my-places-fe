import { Button, Stack } from "@mui/material";
import SubmitButton from "@/containers/route-builder/content/form/sections/control-buttons/SubmitButton";
import { useState } from "react";
import PlaceSelect from "@/containers/create-review/form/place-select/PlaceSelect";
import AddIcon from "@mui/icons-material/Add";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useAppDispatch } from "@/store/hooks";
import { addRouteItemThunk } from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";

const ControlButtons = () => {
  const { t, i18n } = useTranslation("route-builder");
  const dispatch = useAppDispatch();
  const { trigger, getValues, setValue } = useFormContext<IRouteBuilderForm>();
  const [isAddMode, setIsAddMode] = useState(false);
  const onClickAddLocation = () => {
    setIsAddMode(true);
  };

  const onCancel = () => {
    setIsAddMode(false);
  };

  const onConfirmLocation = () => {
    trigger("addPlace").then((isValid) => {
      if (isValid) {
        dispatch(
          addRouteItemThunk({
            id: getValues("addPlace.id") as number,
            language: i18n.language,
          })
        );
        setValue("addPlace", null);
        onCancel();
      }
    });
  };

  return (
    <Stack
      direction={{ md: "row" }}
      mt={"1em"}
      gap={"1em"}
      alignItems={{ md: "center" }}
    >
      {isAddMode ? (
        <>
          <PlaceSelect required fieldName={"addPlace"} />
          <Button
            variant={"contained"}
            size={"large"}
            onClick={onConfirmLocation}
          >
            Добавить
          </Button>
          <Button size={"large"} onClick={onCancel}>
            Отмена
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={onClickAddLocation}
            variant={"outlined"}
            size={"large"}
            sx={{ borderWidth: 2 }}
            startIcon={<AddIcon />}
          >
            Добавить локацию
          </Button>
          <SubmitButton />
        </>
      )}
    </Stack>
  );
};

export default ControlButtons;
