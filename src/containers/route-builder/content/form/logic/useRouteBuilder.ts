import { useForm } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { resetState } from "@/store/route-builder-slice/route-builder.slice";

const useRouteBuilder = () => {
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
      title: "Мой маршрут №1",
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
