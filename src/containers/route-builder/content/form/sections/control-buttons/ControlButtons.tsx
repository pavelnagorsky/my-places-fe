import { Button, Stack } from "@mui/material";
import SubmitButton from "@/containers/route-builder/content/form/sections/control-buttons/SubmitButton";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/route-builder-slice/route-builder.slice";
import { useTranslation } from "next-i18next";
import PlacesAutocomplete from "@/components/forms/custom-form-elements/PlacesAutocomplete";
import { useRouter } from "next/router";
import { routerLinks } from "@/routing/routerLinks";
import { addRouteItemsThunk } from "@/store/route-builder-slice/thunks";
import useRouterPathWithoutQuery from "@/hooks/useRouterPathWithoutQuery";

const ControlButtons = () => {
  const { t, i18n } = useTranslation(["route-management", "common"]);
  const dispatch = useAppDispatch();
  const { trigger, getValues, setValue, setFocus } =
    useFormContext<IRouteBuilderForm>();
  const [isAddMode, setIsAddMode] = useState(false);
  const selectedPlaces = useAppSelector(selectItems);
  const isPlacesLimitExceeded = selectedPlaces.length >= 25;
  const pathWithoutQuery = useRouterPathWithoutQuery();

  const onClickAddLocation = () => {
    setIsAddMode(true);
    setTimeout(() => setFocus("addPlaces"), 100);
  };

  const onCancel = () => {
    setIsAddMode(false);
  };

  const onConfirmLocation = () => {
    trigger("addPlaces").then((isValid) => {
      if (isValid && getValues("addPlaces").length > 0) {
        dispatch(
          addRouteItemsThunk({
            ids: getValues("addPlaces").map((place) => place.id),
            language: i18n.language,
          })
        );
        setValue("addPlaces", []);
        onCancel();
      } else {
        setFocus("addPlaces");
      }
    });
  };

  useEffect(() => {
    if (
      !selectedPlaces.length &&
      pathWithoutQuery === routerLinks.createRoute
    ) {
      setIsAddMode(true);
    }
  }, []);

  return (
    <Stack
      direction={{ sm: isAddMode ? "column" : "row", md: "row" }}
      mt={{ md: "1em" }}
      gap={"1em"}
      alignItems={{ md: "center" }}
    >
      {isAddMode ? (
        <>
          <PlacesAutocomplete
            multiple
            fieldName={"addPlaces"}
            excludeIds={selectedPlaces.map((p) => p.id)}
          />
          <Stack gap={"1em"} alignItems={"center"} direction={"row"}>
            <Button
              variant={"contained"}
              size={"large"}
              onClick={onConfirmLocation}
            >
              {t("add")}
            </Button>
            <Button size={"large"} onClick={onCancel}>
              {t("buttons.cancel", { ns: "common" })}
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Button
            onClick={onClickAddLocation}
            disabled={isPlacesLimitExceeded}
            variant={"outlined"}
            size={"large"}
            sx={{ borderWidth: 2 }}
            startIcon={<AddIcon />}
          >
            {t("addLocation")}
          </Button>
          <SubmitButton />
        </>
      )}
    </Stack>
  );
};

export default ControlButtons;
