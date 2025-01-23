import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { IEditReviewFormContext } from "@/containers/personal-area/my-reviews/edit-my-review/interfaces";
import { routerLinks } from "@/routing/routerLinks";
import { hideAlert, showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IUpdateReview } from "@/services/reviews-service/interfaces/update-review.interface";
import { IEditRouteForm } from "@/containers/personal-area/my-routes/edit-route/logic/interfaces";
import routesService from "@/services/routes-service/routes.service";
import {
  setDistance,
  setDuration,
  setItems,
} from "@/store/route-builder-slice/route-builder.slice";
import searchService from "@/services/search-service/search.service";
import googlePlacesAutocompleteService from "@/services/google-places-service/google-places.service";

const useEditMyRoute = () => {
  const { t, i18n } = useTranslation(["review-management", "common"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const routeId = router.query["id"] as string | undefined;
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

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
      title: "",
    },
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });
  console.log(form.getValues("searchFrom"));

  const onGoBack = () => router.replace(routerLinks.personalAreaRoutes);

  const handleShowNotFoundError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", {
            ns: "common",
          }),
          description: `Маршрут не найден. ${t("errors.description", {
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

    const apiRequest = async () => {
      setLoading(true);
      try {
        const { data } = await routesService.getRoute(+routeId, i18n.language);
        const placesResponse = await searchService.searchByIds(
          data.places.map((place) => place.id),
          i18n.language
        );
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
        dispatch(
          setItems(
            placesResponse.data.map((place, index) => ({
              ...place,
              duration: data.places[index]?.duration || 0,
              distance: data.places[index]?.distance || 0,
            }))
          )
        );
        dispatch(setDuration(data.duration));
        dispatch(setDistance(data.distance));
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
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        handleShowNotFoundError();
      }
    };
    apiRequest();
  }, [i18n.language, routeId]);

  const handleShowError = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.error", {
            ns: "common",
          }),
          description: `${t("feedback.update.error")} ${t(
            "errors.description",
            {
              ns: "common",
            }
          )}`,
          variant: "standard",
          severity: "error",
        },
        snackbarProps: {},
      })
    );
  };

  const handleShowSuccess = () => {
    dispatch(
      showAlertThunk({
        alertProps: {
          title: t("feedback.success", {
            ns: "common",
          }),
          description: t("feedback.update.success"),
          variant: "standard",
          severity: "success",
        },
        snackbarProps: {},
      })
    );
  };

  const onSubmit: SubmitHandler<IEditReviewFormContext> = (data) => {
    // if (submitLoading || !routeId) return;
    // setSubmitLoading(true);
    // dispatch(hideAlert());
    //
    // const updateReviewDto: IUpdateReview = {
    //   title: data.title,
    //   description: data.description,
    //   placeId: data.place?.id as number,
    //   imagesIds: data.images.map((image) => image.id),
    //   shouldTranslate: data.updateTranslations,
    // };
    //
    // reviewsService
    //   .updateReview(+routeId, updateReviewDto, i18n.language)
    //   .then((res) => {
    //     setSubmitLoading(false);
    //     handleShowSuccess();
    //     router.push(routerLinks.personalAreaReviews);
    //   })
    //   .catch((reason) => {
    //     setSubmitLoading(false);
    //     handleShowError();
    //   });
  };

  return {
    form,
    loading,
    onGoBack,
  };
};

export default useEditMyRoute;
