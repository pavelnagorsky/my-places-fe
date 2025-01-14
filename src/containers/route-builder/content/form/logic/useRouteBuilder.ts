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
      addPlace: null,
      title: "Мой маршрут №1",
    },
  });

  const onSaveRoute = useCallback(() => {
    form.handleSubmit((data) => {
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return { form, onSaveRoute };
};

export default useRouteBuilder;
