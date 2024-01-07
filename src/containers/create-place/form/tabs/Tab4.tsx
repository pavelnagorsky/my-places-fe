import { Fragment, memo, useEffect, useMemo } from "react";
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
import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";
import { useGeocode } from "@/hooks/useGeocode";

const Tab4 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setValue, watch, trigger, clearErrors } =
    useFormContext<IPlaceFormContext>();
  const Geocode = useGeocode();
  const watchAddress = watch("address");
  const watchLat = watch("lat");
  const watchLng = watch("lng");
  const watchPosition = {
    lat: watchLat ? +watchLat : 0,
    lng: watchLng ? +watchLng : 0,
  };

  const fetchLatLng = useMemo(
    () =>
      debounce((address: string, position: ILatLngCoordinate) => {
        Geocode.fromAddress(address)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            // optimizing rerenders of map
            if (position?.lat !== +lat && position?.lng !== +lng) {
              setValue("lat", lat);
              setValue("lng", lng);
            }
            clearErrors(["lat", "lng"]);
          })
          .catch((err) => {
            setValue("lat", null as any);
            setValue("lng", null as any);
            trigger(["lat", "lng"]);
          });
      }, 300),
    []
  );

  // updating map marker
  useEffect(() => {
    if (!watchAddress) return;
    fetchLatLng(watchAddress, watchPosition);
  }, [watchAddress]);

  const onDragEnd: (e: google.maps.MapMouseEvent) => void = ({ latLng }) => {
    if (!latLng) return;
    setValue("lat", latLng.lat());
    setValue("lng", latLng.lng());
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
          Адрес
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={6000}
          sx={{ fontSize: "16px", alignSelf: "center" }}
          title={
            <Typography p={"0.5em"}>
              Текст требуется вводить в соотвествии с выбранным языком на сайте.
              На остальные языки контент будет переведен автоматически,
              посредством сервиса Google Translate. При необходимости, Вы
              сможете отредактировать переводы в личном кабинете
            </Typography>
          }
        >
          <IconButton>
            <InfoOutlinedIcon fontSize={"medium"} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        На этом этапе вам нужно ввести адрес заданной локации. Помимо этого, вы
        можете найти его на карте и указать точные координаты.
      </Typography>
      <TextFieldElement
        sx={{
          my: "1em",
          "& input": { bgcolor: "white", borderRadius: "15px" },
          width: { xs: "100%", md: "80%", lg: "70%" },
          fontSize: { md: "20px" },
        }}
        type={"search"}
        name={"address"}
        validation={{
          required: "Это поле обязательно к заполнению",
        }}
        placeholder={
          "Беларусь, Гродненская обл., Сморгонский район, д. Крево..."
        }
      />
      <Typography
        component={"h2"}
        fontSize={{ xs: "18px", md: "25px" }}
        fontWeight={{ xs: 500, md: 400 }}
        my={{ xs: "0.5em", md: "0.4em" }}
      >
        Проверьте, верное ли местоположение показывает карта
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        Координаты места автоматически распознаются в зависимости от введенного
        адреса. При необходимости, вы можете передвинуть маркер на карте или
        указать точные координаты.
      </Typography>
      <Box my={"1.5em"}>
        <Map
          fitCoordinates={watchLat && watchLng ? [watchPosition] : []}
          containerStyle={{ height: isMobile ? "323px" : "500px" }}
        >
          <Marker
            draggable={true}
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
        Координаты
      </Typography>
      <Typography variant={"body2"} fontSize={{ md: "20px" }}>
        Вы можете указать координаты места, если они вам известны. Сначала
        указывается широта, затем долгота.
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
          inputProps={{ step: "0.1" }}
          validation={{
            min: {
              value: 1,
              message: "Введено некорректное значение",
            },
            required: "Это поле обязательно к заполнению",
          }}
          placeholder={"Широта"}
        />
        <TextFieldElement
          type={"number"}
          fullWidth
          inputProps={{ step: "0.1" }}
          sx={{
            "& input": { bgcolor: "white", borderRadius: "5px", py: "0.5em" },
            fontSize: { md: "20px" },
          }}
          name={"lng"}
          validation={{
            min: {
              value: 1,
              message: "Введено некорректное значение",
            },
            required: "Это поле обязательно к заполнению",
          }}
          placeholder={"Долгота"}
        />
      </Stack>
    </Fragment>
  );
};

export default memo(Tab4);
