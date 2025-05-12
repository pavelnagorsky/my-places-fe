import { useForm } from "react-hook-form-mui";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";
import { IExcursionBuilderForm } from "@/containers/excursion-builder/content/form/logic/interfaces";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { resetState } from "@/store/excursion-builder-slice/excursion-builder.slice";

const useExcursionBuilder = () => {
  const { t } = useTranslation("excursion-management");
  const dispatch = useAppDispatch();
  const form = useForm<IExcursionBuilderForm>({
    mode: "onChange",
    shouldUseNativeValidation: false,
    defaultValues: {
      addPlaces: [],
      title: "",
      description: "",
      travelMode: TravelModesEnum.DRIVING,
      type: `${ExcursionTypesEnum.Overview}`,
      regionId: "" as any,
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
      dispatch(resetState());
    };
  }, []);

  return form;
};

export default useExcursionBuilder;
