import { Button, Stack } from "@mui/material";
import SubmitButton from "@/containers/route-builder/content/form/sections/control-buttons/SubmitButton";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addRouteItemsThunk,
  selectItems,
} from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import PlacesAutocomplete from "@/components/forms/custom-form-elements/PlacesAutocomplete";
import OptimizeButton from "@/containers/route-builder/content/form/sections/control-buttons/OptimizeButton";

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
    trigger("addPlaces").then((isValid) => {
      if (isValid) {
        dispatch(
          addRouteItemsThunk({
            ids: getValues("addPlaces").map((place) => place.id),
            language: i18n.language,
          })
        );
        setValue("addPlaces", []);
        onCancel();
      }
    });
  };

  useEffect(() => {
    if (!selectedPlaces.length) {
      setIsAddMode(true);
    }
  }, []);

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
            multiple
            required
            fieldName={"addPlaces"}
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
          <Stack
            direction={{ sm: "row" }}
            gap={"1em"}
            flexGrow={1}
            sx={{ "& button": { width: { xs: "100%", md: "auto" } } }}
          >
            <SubmitButton />
            <OptimizeButton />
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ControlButtons;
