import { useForm } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { resetState } from "@/store/route-builder-slice/route-builder.slice";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";

const useRouteBuilder = () => {
  const { t } = useTranslation("route-management");
  const dispatch = useAppDispatch();
  const form = useForm<IRouteBuilderForm>({
    mode: "onChange",
    shouldUseNativeValidation: false,
    defaultValues: {
      searchFrom: {
        isSearchByMe: false,
        coordinates: null,
        location: null,
      },
      searchTo: {
        isSearchByMe: false,
        coordinates: null,
        location: null,
      },
      addPlaces: [],
      title: t("defaultTitle"),
      travelMode: TravelModesEnum.DRIVING,
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return form;
};

export default useRouteBuilder;
