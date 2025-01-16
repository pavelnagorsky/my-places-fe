import { Button, Stack } from "@mui/material";
import SubmitButton from "@/containers/route-builder/content/form/sections/control-buttons/SubmitButton";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addRouteItemThunk,
  selectItems,
} from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import PlacesAutocomplete from "@/components/forms/custom-form-elements/PlacesAutocomplete";

const ControlButtons = () => {
  const { t, i18n } = useTranslation("route-builder");
  const dispatch = useAppDispatch();
  const { trigger, getValues, setValue } = useFormContext<IRouteBuilderForm>();
  const [isAddMode, setIsAddMode] = useState(false);
  const selectedPlaces = useAppSelector(selectItems);

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
      mt={{ md: "1em" }}
      gap={"1em"}
      alignItems={{ md: "center" }}
    >
      {isAddMode ? (
        <>
          <PlacesAutocomplete
            required
            fieldName={"addPlace"}
            excludeIds={selectedPlaces.map((p) => p.id)}
          />
          <Stack gap={"1em"} alignItems={"center"} direction={"row"}>
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
          </Stack>
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
