import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditReviewFormContext } from "@/containers/personal-area/my-reviews/edit-my-review/interfaces";
import { routerLinks } from "@/routing/routerLinks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { IEditRouteForm } from "@/containers/personal-area/my-routes/edit-route/logic/interfaces";
import { resetState } from "@/store/route-builder-slice/route-builder.slice";
import googlePlacesAutocompleteService from "@/services/google-places-service/google-places.service";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { startRouteEditingThunk } from "@/store/route-builder-slice/thunks";

const useEditMyRoute = () => {
  const { t, i18n } = useTranslation(["route-management", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const routeId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);

  const form = useForm<IEditRouteForm>({
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
      time: new Date(),
      title: t("defaultTitle"),
      travelMode: TravelModesEnum.DRIVING,
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onGoBack = () => router.replace(routerLinks.personalAreaRoutes);

  const handleShowNotFoundError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", {
            ns: "common",
          }),
          description: `${t("feedback.notFound")} ${t("errors.description", {
            ns: "common",
          })}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
    onGoBack();
  };

  useEffect(() => {
    // fetch data for editing
    if (!routeId || Number.isNaN(+routeId)) {
      handleShowNotFoundError();
      return;
    }

    setLoading(true);

    const onSuccess = async (data: IRoute) => {
      try {
        const startLocationTitleResponse =
          await googlePlacesAutocompleteService.getLocationTitle(
            data.coordinatesStart,
            i18n.language
          );
        const endLocationTitleResponse =
          await googlePlacesAutocompleteService.getLocationTitle(
            data.coordinatesEnd,
            i18n.language
          );

        // reset form state
        form.reset({
          ...form.getValues(),
          searchFrom: {
            coordinates: `${data.coordinatesStart.lat};${data.coordinatesStart.lng}`,
            isSearchByMe: false,
            location: {
              description:
                startLocationTitleResponse.data.results[0]?.formatted_address ||
                "",
            },
          },
          searchTo: {
            coordinates: `${data.coordinatesEnd.lat};${data.coordinatesEnd.lng}`,
            isSearchByMe: false,
            location: {
              description:
                endLocationTitleResponse.data.results[0]?.formatted_address ||
                "",
            },
          },
          title: data.title,
          travelMode: data.travelMode || TravelModesEnum.DRIVING,
        });
      } catch (e) {}
      setLoading(false);
    };

    const onError = () => {
      setLoading(false);
      handleShowNotFoundError();
    };

    dispatch(
      startRouteEditingThunk({
        id: +routeId,
        language: i18n.language,
        onSuccess,
        onError,
      })
    );
  }, [i18n.language, routeId]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return {
    form,
    loading,
    onGoBack,
  };
};

export default useEditMyRoute;
