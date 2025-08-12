import { Fragment, memo, useCallback, useEffect, useMemo } from "react";
import {
  Box,
  debounce,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TextFieldElement, useFormContext } from "react-hook-form-mui";
import Map, { ILatLngCoordinate } from "@/components/map/Map";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Marker } from "@react-google-maps/api";
import {
  IPlaceFormContext,
  IPlaceTabProps,
} from "@/containers/create-place/form/interfaces";
import { useGeocode } from "@/hooks/google/useGeocode";
import { useTranslation } from "next-i18next";

const Tab4 = ({ readonly }: IPlaceTabProps) => {
  const { t } = useTranslation(["place-management", "common"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setValue, watch, trigger, clearErrors, formState } =
    useFormContext<IPlaceFormContext>();
  const Geocode = useGeocode();
  const watchLat = watch("lat");
  const watchLng = watch("lng");
  const watchPosition = {
    lat: watchLat ? +watchLat : 0,
    lng: watchLng ? +watchLng : 0,
  };

  const fetchLatLng = useCallback(
    (address: string) => {
      if (!address) return;
      Geocode.fromAddress(address)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          // optimizing rerenders of map
          if (watchPosition?.lat !== +lat && watchPosition?.lng !== +lng) {
            setValue("lat", lat, { shouldDirty: true });
            setValue("lng", lng, { shouldDirty: true });
          }
          clearErrors(["lat", "lng"]);
        })
        .catch((err) => {
          console.log("fetch error", err);
          setValue("lat", null as any);
          setValue("lng", null as any);
          trigger(["lat", "lng"]);
        });
    },
    [watchPosition]
  );

  const onDragEnd: (e: google.maps.MapMouseEvent) => void = ({ latLng }) => {
    if (!latLng) return;
    setValue("lat", latLng.lat(), { shouldDirty: true });
    setValue("lng", latLng.lng(), { shouldDirty: true });
  };

  return (
    <Fragment>
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
          fontSize={{ xs: "20px", md: "30px" }}
          fontWeight={{ xs: 500, md: 400 }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          {t("tabs.4.title")}
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={3000}
          sx={{ fontSize: "16px", alignSelf: "center" }}
          title={
            <Typography p={"0.5em"}>
              {t("translations.tooltip", { ns: "common" })}
            </Typography>
          }
        >
          <IconButton>
            <InfoOutlinedIcon fontSize={"medium"} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        {t("tabs.4.description")}
      </Typography>
      <TextFieldElement
        InputProps={{
          readOnly: readonly,
        }}
        inputProps={{
          onChange: debounce((e) => fetchLatLng(e.target.value), 300),
        }}
        sx={{
          my: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: { xs: "100%", md: "80%", lg: "70%" },
          fontSize: { md: "20px" },
        }}
        type={"search"}
        name={"address"}
        rules={{
          required: t("errors.required", {
            ns: "common",
          }),
        }}
        placeholder={t("tabs.4.addressPlaceholder")}
      />
      <Typography
        component={"h2"}
        fontSize={{ xs: "18px", md: "25px" }}
        fontWeight={{ xs: 500, md: 400 }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        {t("tabs.4.mapTitle")}
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        {t("tabs.4.mapDescription")}
      </Typography>
      <Box my={"1.5em"}>
        <Map
          fitCoordinates={watchLat && watchLng ? [watchPosition] : []}
          containerStyle={{ height: isMobile ? "323px" : "500px" }}
        >
          <Marker
            draggable={!readonly}
            onDragEnd={onDragEnd}
            position={watchPosition}
          />
        </Map>
      </Box>
      <Typography
        component={"h2"}
        fontSize={{ xs: "18px", md: "25px" }}
        fontWeight={{ xs: 500, md: 400 }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        {t("tabs.4.coordinates")}
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        {t("tabs.4.coordinatesDescription")}
      </Typography>
      <Stack
        direction={"row"}
        mt={"1em"}
        gap={"1em"}
        mb={"3em"}
        maxWidth={"500px"}
      >
        <TextFieldElement
          type={"number"}
          sx={{
            "& input": { bgcolor: "white", borderRadius: "5px", py: "0.5em" },
            fontSize: { md: "20px" },
          }}
          fullWidth
          name={"lat"}
          inputProps={{ step: "0.1", readOnly: readonly }}
          rules={{
            min: {
              value: 1,
              message: t("errors.invalid", {
                ns: "common",
              }),
            },
            required: t("errors.required", {
              ns: "common",
            }),
          }}
          placeholder={t("tabs.4.latitude")}
        />
        <TextFieldElement
          type={"number"}
          fullWidth
          inputProps={{ step: "0.1", readOnly: readonly }}
          sx={{
            "& input": { bgcolor: "white", borderRadius: "5px", py: "0.5em" },
            fontSize: { md: "20px" },
          }}
          name={"lng"}
          rules={{
            min: {
              value: 1,
              message: t("errors.invalid", {
                ns: "common",
              }),
            },
            required: t("errors.required", {
              ns: "common",
            }),
          }}
          placeholder={t("tabs.4.longitude")}
        />
      </Stack>
    </Fragment>
  );
};

export default memo(Tab4);
